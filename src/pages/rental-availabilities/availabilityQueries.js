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
  GET_RENTALS_AVAILABILITY: gql`
    query MyQuery($id: bigint!) {
      rental_availabilities(where: { rental_id: { _eq: $id } }) {
        #  adult_price
        cancellation_policy
        capacity
        #  child_price
        created_at
        excludes
        #  final_adult_price
        #  final_child_price
        from
        id
        includes
        #  off_days
        #  program_days
        status
        to
      }
    }
  `,
};
