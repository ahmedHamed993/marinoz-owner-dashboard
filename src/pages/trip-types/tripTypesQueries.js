import { gql } from "@apollo/client";

export const tripTypesQueries = {
  GET_TOUR_TRIP_TYPES: gql`
    query MyQuery($id: bigint!) {
      tour_trip_types(where: { tour_id: { _eq: $id } }) {
        id
        trip_type {
          id
          price
          title
        }
      }
    }
  `,
  GET_RENTAL_TRIP_TYPES: gql`
    query MyQuery($id: bigint!) {
      rental_trip_types(where: { rental_id: { _eq: $id } }) {
        id
        trip_type {
          id
          price
          title
        }
      }
    }
  `,
    GET_EVENT_TRIP_TYPES: gql`
    query MyQuery($id: bigint!) {
      event_trip_types(where: { event_id: { _eq: $id } }) {
        id
        trip_type {
          id
          price
          title
        }
      }
    }
  `,
   GET_SUITE_TRIP_TYPES: gql`
   query MyQuery($id: bigint!) {
     suite_trip_types(where: { suite_id: { _eq: $id } }) {
       id
       trip_type {
         id
         price
         title
       }
     }
   }
 `,
};
