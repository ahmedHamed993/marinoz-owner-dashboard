import { gql } from "@apollo/client";
export const GET_YACHT_ADDONS = gql`
  query MyQuery {
    yacht_addons {
      addone_title_en
      id
    }
  }
`;
