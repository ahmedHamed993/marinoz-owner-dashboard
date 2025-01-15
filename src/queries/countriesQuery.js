import { gql } from "@apollo/client";
export const GET_COUNTRIES = gql`
  query MyQuery {
    countries {
      country_en
      id
    }
  }
`;
