import { gql } from "@apollo/client";

export const GET_CITIES = gql`
  query MyQuery($country_id: bigint!) {
    cities(where: { country_id: { _eq: $country_id } }, limit: 8) {
      city_ar
      city_de
      city_en
      city_ru
      id
      image
    }
  }
`;
