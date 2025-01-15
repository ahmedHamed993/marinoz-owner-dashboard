import { gql } from "@apollo/client";

export const waterSportsQueries = {
  GET_TOUR_WATER_SPORTS: gql`
    query MyQuery($id: bigint!) {
      tour_water_sports(where: { tour_id: { _eq: $id } }) {
        id
        water_sport {
          id
          price
          title
        }
      }
    }
  `,
  GET_RENTAL_WATER_SPORTS: gql`
    query MyQuery($id: bigint!) {
      rental_water_sports(where: { rental_id: { _eq: $id } }) {
        id
        water_sport {
          id
          price
          title
        }
      }
    }
  `,
    GET_EVENT_WATER_SPORTS: gql`
    query MyQuery($id: bigint!) {
      event_water_sports(where: { event_id: { _eq: $id } }) {
        id
        water_sport {
          id
          price
          title
        }
      }
    }
  `,
  GET_SUITE_WATER_SPORTS: gql`
  query MyQuery($id: bigint!) {
    suite_water_sports(where: { suite_id: { _eq: $id } }) {
      id
      water_sport {
        id
        price
        title
      }
    }
  }
`,
};
