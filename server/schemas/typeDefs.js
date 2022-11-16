const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: Int!
    savedBooks: [Book]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Book {
    _id: ID
    bookId: String
    image: String
    link: String
    title: String
    authors: [String]
    description: String
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addBook(userId: ID!, bookId: String!, image: String, link: String, title: String, authors: [String], description: String): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;