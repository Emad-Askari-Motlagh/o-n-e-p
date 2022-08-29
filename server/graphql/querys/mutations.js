import { gql } from "@apollo/client";

export const fetchUser = gql`
  mutation ($name: ID!) {
    getCurrentUser(name: $name) {
      name
      isAdmin
    }
  }
`;

export const addRestaurant = gql`
  mutation addRestaurant(
    $name: String!
    $owner: String!
    $description: String!
    $numReviews: Int!
    $reviews: [String!]
    $type: String!
    $images: [String!]
    $location: Location!
    $rating: Int!
    $id: String!
  ) {
    addRestaurant(
      name: $name
      owner: $owner
      description: $description
      numReviews: $numReviews
      reviews: $reviews
      type: $type
      images: $images
      location: $location
      rating: $rating
      id: $id
    ) {
      name
      productId
    }
  }
`;

export const LoginMutation = gql`
  mutation SignIn($email: String!, $password: String!) {
    SignIn(email: $email, password: $password) {
      token
    }
  }
`;
export const LoginWithGoogle = gql`
  mutation LoginWithGoogle($email: String!, $password: String!) {
    LoginWithGoogle(email: $email, password: $password) {
      token
    }
  }
`;
export const CreateUser = gql`
  mutation CreateUser($email: String!, $password: String!, $username: String!) {
    CreateUser(email: $email, password: $password, username: $username) {
      name
    }
  }
`;

export const FETCH_FILTERED_RESTAURANTS = gql`
  mutation fetchRestaurantsByQuery($searchQuery: String) {
    fetchRestaurantsByQuery(searchQuery: $searchQuery) {
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

export const ADD_COSTUMER = gql`
  mutation AddCostumer($name: String!, $email: String!, $table: Int!) {
    AddCostumer(name: $name, email: $email, table: $table) {
      name
      table
      email
    }
  }
`;

export const SIGN_OUT = gql`
  mutation signOut {
    signOut
  }
`;

export const SIGN_OUT_COSTUMER = gql`
  mutation signOutCostumer {
    signOutCostumer
  }
`;

export const SAVE_COSTUMER_EXPIRE_TIME = gql`
  mutation {
    CostumerExpiry
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($productId: ID!) {
    addOrder(productId: $productId) {
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

export const REMOVE_ORDER = gql`
  mutation removeOrder($productId: ID!) {
    removeOrder(productId: $productId) {
      orderQuantity
    }
  }
`;

export const GET_ORDER_ITEM = gql`
  mutation getOrderItem($productId: ID!) {
    getOrderItem(productId: $productId, restaurant: $restaurant) {
      restaurant
      orderQuantity
    }
  }
`;

export const DELETE_COSTUMER = gql`
  mutation DeleteCostumer($costumerId: String) {
    DeleteCostumer(costumerId: $costumerId) {
      name
    }
  }
`;
export const CONNECT_TO_SOCKET = gql`
  mutation connectToSocket {
    connectToSocket {
      orderQuantity
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation postMessage($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;
export const GET_COSTUMER_ORDERS = gql`
  mutation CostumerOrders($restaurant: String!) {
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
