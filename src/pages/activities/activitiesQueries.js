import { gql } from "@apollo/client";

export const activitiesQueries = {
  GET_TOUR_ACTIVITIES: gql`
    query MyQuery($id: bigint!) {
      tour_activities(where: { tour_id: { _eq: $id } }) {
        id
        activity {
          price
          title
        }
      }
    }
  `,
  GET_RENTAL_ACTIVITIES: gql`
    query MyQuery($id: bigint!) {
      rental_activities(where: { rental_id: { _eq: $id } }) {
        id
        activity {
          price
          title
        }
      }
    }
  `,
  GET_EVENTS_ACTIVITIES: gql`
    query MyQuery($id: bigint!) {
      event_activities(where: { event_id: { _eq: $id } }) {
        id
        activity {
          price
          title
        }
      }
    }
  `,
   GET_SUITE_ACTIVITIES: gql`
   query MyQuery($id: bigint!) {
     suite_activities(where: { suite_id: { _eq: $id } }) {
       id
       activity {
         price
         title
       }
     }
   }
 `,
};
