import { gql } from "@apollo/client";

export const snorkelingEquipmentQueries = {
  GET_TOUR_SNORKELING_EQUIPMENT: gql`
    query MyQuery($id: bigint!) {
      tour_snorkeling_equipment(where: { tour_id: { _eq: $id } }) {
        id
        snorkeling_equipment {
          id
          price
          title
        }
      }
    }
  `,
  GET_RENTAL_SNORKELING_EQUIPMENT: gql`
    query MyQuery($id: bigint!) {
      rental_snorkeling_equipment(where: { rental_id: { _eq: $id } }) {
        id
        snorkeling_equipment {
          id
          price
          title
        }
      }
    }
  `,
   GET_EVENT_SNORKELING_EQUIPMENT: gql`
   query MyQuery($id: bigint!) {
     event_snorkeling_equipment(where: { event_id: { _eq: $id } }) {
       id
       snorkeling_equipment {
         id
         price
         title
       }
     }
   }
 `,
 GET_SUITE_SNORKELING_EQUIPMENT: gql`
 query MyQuery($id: bigint!) {
   suite_snorkeling_equipment(where: { suite_id: { _eq: $id } }) {
     id
     snorkeling_equipment {
       id
       price
       title
     }
   }
 }
`,
};
