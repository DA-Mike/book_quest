import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user{
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
  mutation AddBook($userId: ID!, $bookId: String!, $title: String, $authors: [String], $image: String, $link: String, $description: String) {
    addBook(userId: $userId, bookId: $bookId, title: $title, authors: $authors, image: $image, link: $link, description: $description) {
      _id
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
    }
  }
`;