import { gql } from "@apollo/client";

export const FETCH_ALL_RESTAURANTS = gql`
  query Restaurants {
    Restaurants {
      name
      owner
      description
      numReviews
      reviews
      type
      images
      rating
      _id
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query CurrentUser {
    CurrentUser {
      name
      email
      _id
      restaurant {
        name
      }
    }
  }
`;

export const GET_COSTUMER = gql`
  query Costumer {
    Costumer {
      name
      email
      table
      _id
    }
  }
`;

export const GET_MENU_CATREGORY = gql`
  query MenuByCategory($restaurant: String!) {
    MenuByCategory(restaurant: $restaurant) {
      itemName
      collectionType
      _id
      image
    }
  }
`;
export const GET_MENU = gql`
  query Menu($restaurant: String!) {
    Menu(restaurant: $restaurant) {
      itemName
    }
  }
`;
export const GET_MENU_ITEM_BY_CATREGORY = gql`
  query MenuItemByCategory($category: String!, $restaurant: String!) {
    MenuItemByCategory(category: $category, restaurant: $restaurant) {
      __typename
      ... on MenuItem {
        name
        orderQuantity
        description
        price
        quantity
        images
        _id
      }
      __typename
      ... on OrderItem {
        orderQuantity
      }
    }
  }
`;

export const GET_MENU_ITEM_COUNT = gql`
  query MenuItemCount($category: String!, $restaurant: String!) {
    MenuItemCount(category: $category, restaurant: $restaurant) {
      product {
        name
      }
    }
  }
`;

export const GET_MENU_ITEMS = gql`
  query OrderItems {
    OrderItems {
      _id
      product {
        quantity
      }
    }
  }
`;

export const GET_ORDERS_CONSTANTLY = gql`
  query Orders($restaurant: String!) {
    Orders(restaurant: $restaurant) {
      _id
      orderQuantity
      product {
        name
        price
        description
        _id
      }
    }
  }
`;

export const GET_ADMIN_ORDERS = gql`
  query AdminOrders {
    AdminOrders {
      __typename
      _id
      orderQuantity
      product {
        __typename
        name
        price
        description
        _id
      }
      costumer {
        __typename
        table
        _id
      }
    }
  }
`;
// export const NEW_PERSON_FRAGMENT = gql`
//   fragment NewOrder on AdminOrder {
//     AdminOrders {
//       __typename
//       _id
//       orderQuantity
//       product {
//         __typename
//         name
//         price
//         description
//         _id
//       }
//       costumer {
//         __typename
//         table
//         _id
//       }
//     }
//   }
// `;
export const GET_COSTUMER_ORDERS = gql`
  query CostumerOrders($restaurant: String!) {
    CostumerOrders(restaurant: $restaurant) {
      orderQuantity
      _id
      product {
        name
        price
        description
        _id
      }
    }
  }
`;

export const COSTUMER_ADDRESS = gql`
  query Address {
    Address {
      title
      city
      region
      postNumber
      address
    }
  }
`;
export const GET_PAYED_ORDERS = gql`
  query PayedOrders($restaurant: String!) {
    PayedOrders(restaurant: $restaurant) {
      _id
      date
      createdAt
      product {
        name
        itemsType
        price
      }
    }
  }
`;
