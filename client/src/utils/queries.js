import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query Users {
        users {
            _id
            password
            username
            email
            savedBooks {
                _id
                bookId
                image
                link
                title
                description
                authors
            }
        }
    }
`;

export const QUERY_SINGLE_USER = gql`
    query User($userId: ID!) {
        user(userId: $userId) {
            _id
            savedBooks {
            _id
            authors
            bookId
            description
            image
            link
            title
            }
        }
    }
`;

export const GET_ME = gql`
query me {
    me {
        _id
        username
        email
        savedBooks {
            _id
            description
            bookId
            image
            link
            title
            authors
        }
    }
}
`;

