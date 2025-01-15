import { gql } from "@apollo/client";

export const thingsToDoQueries = {
  GET_TOUR_THINGS_TO_DO: gql`
    query MyQuery($id: bigint!) {
      tour_thing_to_dos(where: { tour_id: { _eq: $id } }) {
        id
        thing_to_do {
          price
          title
        }
      }
    }
  `,
  GET_RENTAL_THINGS_TO_DO: gql`
    query MyQuery($id: bigint!) {
      rental_thing_to_dos(where: { rental_id: { _eq: $id } }) {
        id
        thing_to_do {
          price
          title
        }
      }
    }
  `,
   GET_EVENT_THINGS_TO_DO: gql`
   query MyQuery($id: bigint!) {
     event_thing_to_dos(where: { event_id: { _eq: $id } }) {
       id
       thing_to_do {
         price
         title
       }
     }
   }
 `,
  GET_SUITE_THINGS_TO_DO: gql`
  query MyQuery($id: bigint!) {
    suite_thing_to_dos(where: { suite_id: { _eq: $id } }) {
      id
      thing_to_do {
        price
        title
      }
    }
  }
`,
};
