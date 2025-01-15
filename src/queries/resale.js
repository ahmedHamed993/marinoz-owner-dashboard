import { gql } from "@apollo/client";
export const GET_RESALE = gql`
  query MyQuery2 {
    resales(limit: 10, offset: 0) {
      id
      yacht {
        name
        price
        images
        city {
          city_en
        }
        build_year
        condition
      }
      created_at
    }
    resales_aggregate {
      aggregate {
        count
      }
    }
  }
`;
