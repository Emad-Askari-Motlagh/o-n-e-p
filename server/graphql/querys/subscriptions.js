import { gql } from "@apollo/client";

export const GET_SUBCRIBTION_ITEMS = gql`
  subscription messages {
    messages {
      content
    }
  }
`;
export const GET_ADMIN_ORDERS = gql`
  subscription AdminOrders {
    AdminOrders {
      _id
      orderQuantity
      product {
        name
        price
        description
        _id
      }
      costumer {
        _id
        table
      }
    }
  }
`;
const COMMENTS_SUBSCRIPTION = gql`
  subscription OnCommentAdded($postID: ID!) {
    commentAdded(postID: $postID) {
      id
      content
    }
  }
`;
