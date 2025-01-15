import { gql } from "@apollo/client";

export const addonsQueries = {
  GET_TOUR_AVAILABILITY_ADDONS: gql`
    query MyQuery($id: bigint!) {
      addons(where: { availability_id: { _eq: $id } }) {
        price
        title
        created_at
        id
      }
    }
  `,
  GET_RENTAL_AVAILABILITY_ADDONS: gql`
    query MyQuery($id: bigint!) {
      rental_addons(where: { rental_availability_id: { _eq: $id } }) {
        price
        title
        created_at
        id
      }
    }
  `,
  GET_EVENT_AVAILABILITY_ADDONS: gql`
    query MyQuery($id: bigint!) {
      event_addons(where: { event_availability_id: { _eq: $id } }) {
        price
        title
        created_at
        id
      }
    }
  `,
  GET_SUITE_AVAILABILITY_ADDONS: gql`
  query MyQuery($id: bigint!) {
    suite_addons(where: { suite_availability_id: { _eq: $id } }) {
      price
      title
      created_at
      id
    }
  }
`,
};
