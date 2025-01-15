import { gql } from "@apollo/client";

export const foodBeveragesQueries = {
  GET_TOUR_FOOD_BEVERAGES: gql`
    query MyQuery($id: bigint!) {
      tour_food_beverages(where: { tour_id: { _eq: $id } }) {
        id
        food_beverage {
          id
          price
          title
        }
      }
    }
  `,
  GET_RENTAL_FOOD_BEVERAGES: gql`
    query MyQuery($id: bigint!) {
      rental_food_beverages(where: { rental_id: { _eq: $id } }) {
        id
        food_beverage {
          id
          price
          title
        }
      }
    }
  `,
  GET_EVENT_FOOD_BEVERAGES: gql`
  query MyQuery($id: bigint!) {
    event_food_beverages(where: { event_id: { _eq: $id } }) {
      id
      food_beverage {
        id
        price
        title
      }
    }
  }
`,
  GET_SUITE_FOOD_BEVERAGES: gql`
  query MyQuery($id: bigint!) {
    suite_food_beverages(where: { suite_id: { _eq: $id } }) {
      id
      food_beverage {
        id
        price
        title
      }
    }
  }
`,
};
