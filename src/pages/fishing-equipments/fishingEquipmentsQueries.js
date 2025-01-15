import { gql } from "@apollo/client";

export const fishingEquipmentQueries = {
  GET_TOUR_FISHING_EQUIPMENT: gql`
    query MyQuery($id: bigint!) {
      tour_fishing_equipment(where: { tour_id: { _eq: $id } }) {
        id
        fishing_equipment {
          price
          title
        }
      }
    }
  `,
  GET_RENTAL_FISHING_EQUIPMENT: gql`
    query MyQuery($id: bigint!) {
      rental_fishing_equipment(where: { rental_id: { _eq: $id } }) {
        id
        fishing_equipment {
          price
          title
        }
      }
    }
  `,
    GET_EVENT_FISHING_EQUIPMENT: gql`
    query MyQuery($id: bigint!) {
      event_fishing_equipment(where: { event_id: { _eq: $id } }) {
        id
        fishing_equipment {
          price
          title
        }
      }
    }
  `,
    GET_SUITE_FISHING_EQUIPMENT: gql`
    query MyQuery($id: bigint!) {
      suite_fishing_equipment(where: { suite_id: { _eq: $id } }) {
        id
        fishing_equipment {
          price
          title
        }
      }
    }
  `,
};
