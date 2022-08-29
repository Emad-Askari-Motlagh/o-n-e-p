import { gql } from "@apollo/client";

export const FETCH_ALL_RESTAURANTS = gql`
  query fetchRestaurants {
    fetchRestaurants {
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
  query getCurrentUser {
    getCurrentUser {
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
  query getCostumer {
    getCostumer {
      name
      email
      table
      _id
    }
  }
`;

export const GET_MENU_CATREGORY = gql`
  query getMenuByCategory($restaurant: String!) {
    getMenuByCategory(restaurant: $restaurant) {
      itemName
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
  query getMenuItemByCategory($category: String!, $restaurant: String!) {
    getMenuItemByCategory(category: $category, restaurant: $restaurant) {
      __typename
      ... on MenuItem {
        name
        orderQuantity
        description
        price
        quantity
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
  query getMenuItemCount($category: String!, $restaurant: String!) {
    getMenuItemCount(category: $category, restaurant: $restaurant) {
      count
    }
  }
`;

export const GET_MENU_ITEMS = gql`
  query getOrderItems {
    getOrderItems {
      _id
      quantity
    }
  }
`;

export const GET_ORDERS_CONSTANTLY = gql`
  query orders($restaurant: String!) {
    orders(restaurant: $restaurant) {
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
export const NEW_PERSON_FRAGMENT = gql`
  fragment NewOrder on AdminOrder {
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
