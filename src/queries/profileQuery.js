import { gql } from "@apollo/client";
export const GET_PROFILE = gql`
  query MyQuery {
    clients_by_pk(id: "c289efe6-f210-42b5-9003-96a3cb89f3e3") {
      address
      email
      image
      id
      name
      phone_number
      date_of_birth
      created_at
      tour_reviews(limit: 10, offset: 0) {
        client_id
        comment
        stars
        id
        tour_id
        created_at
        updated_at
      }
      tour_reviews_aggregate {
        aggregate {
          count
          avg {
            stars
          }
        }
      }
    }
  }
`;
