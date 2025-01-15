import { gql } from "@apollo/client";

export const GET_YACHT_TYPES = gql`
  query MyQuery {
    yacht_types {
      yacht_type_en
      id
    }
  }
`;
