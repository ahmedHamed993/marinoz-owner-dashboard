import { gql } from "@apollo/client";

export const transportationQueries = {
  GET_TOUR_TRANSPORTATION: gql`
    query MyQuery($id: bigint!) {
      tour_transportations(where: { tour_id: { _eq: $id } }) {
        id
        transportation {
          price
          title
          id
        }
      }
    }
  `,
  GET_RENTAL_TRANSPORTATION: gql`
    query MyQuery($id: bigint!) {
      rental_transportations(where: { rental_id: { _eq: $id } }) {
        id
        transportation {
          price
          title
          id
        }
      }
    }
  `,
   GET_EVENT_TRANSPORTATION: gql`
   query MyQuery($id: bigint!) {
     event_transportations(where: { event_id: { _eq: $id } }) {
       id
       transportation {
         price
         title
         id
       }
     }
   }
 `,
 GET_SUITE_TRANSPORTATION: gql`
 query MyQuery($id: bigint!) {
   suite_transportations(where: { suite_id: { _eq: $id } }) {
     id
     transportation {
       price
       title
       id
     }
   }
 }
`,
};
