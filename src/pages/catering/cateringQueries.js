import { gql } from "@apollo/client";

export const cateringQueries = {
  GET_TOUR_CATERING: gql`
    query MyQuery($id: bigint!) {
      tour_caterings(where: { tour_id: { _eq: $id } }) {
        id
        catering {
          price
          title
        }
      }
    }
  `,
  GET_RENTAL_CATERING: gql`
    query MyQuery($id: bigint!) {
      rental_caterings(where: { rental_id: { _eq: $id } }) {
        id
        catering {
          price
          title
        }
      }
    }
  `,
   GET_EVENT_CATERING: gql`
   query MyQuery($id: bigint!) {
     event_caterings(where: { event_id: { _eq: $id } }) {
       id
       catering {
         price
         title
       }
     }
   }
 `,
  GET_SUITE_CATERING: gql`
  query MyQuery($id: bigint!) {
    suite_caterings(where: { suite_id: { _eq: $id } }) {
      id
      catering {
        price
        title
      }
    }
  }
`,
};
