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


