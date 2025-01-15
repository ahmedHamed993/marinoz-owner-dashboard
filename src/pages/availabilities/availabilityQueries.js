import { gql } from "@apollo/client";
export const availabilityQueries = {
  GET_TOURS_AVAILABILITY: gql`
    query MyQuery($id: bigint!) {
      availabilities(where: { tour_id: { _eq: $id } }) {
        adult_price
        cancellation_policy
        capacity
        child_price
        created_at
        excludes
        final_adult_price
        final_child_price
        from
        id
        includes
        off_days
        program_days
        status
        to
      }
    }
  `,
  GET_EVENTS_AVAILABILITY: gql`
    query MyQuery($id: bigint!) {
      event_availabilities(where: { event_id: { _eq: $id } }) {
        cancellation_policy
        capacity
        created_at
        excludes
        from
        id
        includes
        status
        to
      }
    }
  `,
   GET_SUITES_AVAILABILITY: gql`
   query MyQuery($id: bigint!) {
     suite_availabilities(where: { suite_id: { _eq: $id } }) {
       cancellation_policy
       capacity
       created_at
       excludes
       from
       id
       includes
       status
       to
     }
   }
 `,
  GET_AVAILABILITY_BY_ID: gql`
    query MyQuery($id: bigint!) {
      availabilities_by_pk(id: $id) {
        adult_price
        cancellation_policy
        capacity
        child_price
        created_at
        excludes
        final_adult_price
        final_child_price
        from
        id
        includes
        off_days
        program_days
        status
        to
        tour_id
      }
    }
  `,
  GET_EVENT_AVAILABILITY_BY_ID: gql`
    query MyQuery($id: bigint!) {
      event_availabilities_by_pk(id: $id) {
        adult_price
        cancellation_policy
        capacity
        child_price
        created_at
        excludes
        final_adult_price
        final_child_price
        from
        id
        includes
        off_days
        program_days
        status
        to
      }
    }
  `,
   GET_SUITE_AVAILABILITY_BY_ID: gql`
   query MyQuery($id: bigint!) {
     suite_availabilities_by_pk(id: $id) {
       adult_price
       cancellation_policy
       capacity
       child_price
       created_at
       excludes
       final_adult_price
       final_child_price
       from
       id
       includes
       off_days
       program_days
       status
       to
     }
   }
 `,
};
