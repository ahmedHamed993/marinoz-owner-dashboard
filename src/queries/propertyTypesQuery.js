import { gql } from "@apollo/client";
export const GET_PROPERTY_TYPES = gql`
  query MyQuery {
    property_types(limit: 99, offset: 0) {
      id
      created_at
      property_type_ar
      property_type_de
      property_type_en
      property_type_ru
    }
  }
`;
