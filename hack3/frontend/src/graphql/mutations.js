import { gql } from '@apollo/client';

// TODO 3.1 Mutation - Update item
export const CREATE_ITEM_MUTATION = gql`
  mutation CreateItem(
    $name: String!
    $amount: Int!
    $category: String!
    $date: String!
    $description: String!
  ) {
    createItem(
      data: {
        name: $name
        amount: $amount
        category: $category
        date: $date
        description: $description
      }
    ) {
        name
        amount
        category
        date
        description
    }
  }
`;
// TODO 3.1 End

export const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      id
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`;
