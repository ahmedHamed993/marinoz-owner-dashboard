import { gql } from "@apollo/client";

export const GET_FEATURES = gql`
  query MyQuery {
    features {
      feature_ar
      feature_de
      feature_en
      feature_ru
      id
      created_at
    }
  }
`;
