import { gql } from '@apollo/client';

//get user information query for logged in user
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        bookId
        authors
        title
        description
        image
        link
      }
    }
}

`;
