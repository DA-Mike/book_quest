const { User, bookSchema } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    user: async (parent, { userId }) => {
        return User.findOne({ _id: userId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user);
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in! (me route)');
    },
  },
  Mutation: {
    addBook: async (parent, args ) => { 
      const newBook = await User.findOneAndUpdate(
        { _id: args.userId },
        {
            $addToSet: { savedBooks: args }
        },
        { new: true }
      );
      return newBook;
    },
    removeBook: async (parent, { userId, bookId }) => {
        return User.findOneAndUpdate(
            { _id: userId },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
        );
    },
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
