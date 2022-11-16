const { User, bookSchema } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    user: async (parent, { userId }) => {
        console.log('user called');
        return await User.findOne({ _id: userId });
    },
    me: async (parent, args, context) => {
      console.log('me called');
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in! (me route)');
    },
  },
  Mutation: {
    addBook: async (parent, args, context ) => { 
      if (context.user) {
        const newBook = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
              $push: { savedBooks: args }
          },
          { new: true }
        );
        return newBook;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addUser: async (parent, { username, email, password }, context) => {
        const user = await User.create({ username, email, password });
        const token = await signToken(user);
        return { token, user };
    },
    login: async (parent, { email, password }, context) => {
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
