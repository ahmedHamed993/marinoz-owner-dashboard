import { gql } from "@apollo/client";

export const marineAttractionsQueries = {
  GET_TOUR_MARINE_ATTRACTIONS: gql`
    query MyQuery($id: bigint!) {
      tour_marine_attractions(where: { tour_id: { _eq: $id } }) {
        id
        marine_attraction {
          id
          price
          title
        }
      }
    }
  `,
  GET_RENTAL_MARINE_ATTRACTIONS: gql`
    query MyQuery($id: bigint!) {
      rental_marine_attractions(where: { rental_id: { _eq: $id } }) {
        id
        marine_attraction {
          id
          price
          title
        }
      }
    }
  `,
  GET_EVENT_MARINE_ATTRACTIONS: gql`
  query MyQuery($id: bigint!) {
    event_marine_attractions(where: { event_id: { _eq: $id } }) {
      id
      marine_attraction {
        id
        price
        title
      }
    }
  }
`,
  GET_SUITE_MARINE_ATTRACTIONS: gql`
  query MyQuery($id: bigint!) {
    suite_marine_attractions(where: { suite_id: { _eq: $id } }) {
      id
      marine_attraction {
        id
        price
        title
      }
    }
  }
`,
};
