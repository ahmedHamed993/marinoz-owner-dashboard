import { gql } from "@apollo/client";
export const GET_TOURS = gql`
  query MyQuery {
    tours {
      image
      name
      city_id
      id
      availabilities {
        final_adult_price
        final_child_price
      }
      city {
        city_en
        country {
          country_en
        }
      }
    }
  }
`;

export const GET_TOUR_BY_ID = gql`
  query MyQuery($ids: bigint!) {
    tours_by_pk(id: $ids) {
      description
      id
      image
      images
      location
      name
      note
      owner_id
      city {
        city_en
      }
      availabilities {
        cancellation_policy
        capacity
        excludes
        final_adult_price
        final_child_price
        from
        id
        includes
        off_days
        program_days
        to
        tour_id
        addons {
          id
          price
          title
          selected
        }
        addons_aggregate {
          aggregate {
            count
          }
        }
      }
      availabilities_aggregate {
        aggregate {
          count
        }
      }
      tour_reviews(limit: 2, offset: 0) {
        client {
          id
          name
          image
        }
        comment
        stars
        id
        created_at
      }
      tour_reviews_aggregate {
        aggregate {
          avg {
            stars
          }
          count
        }
      }
    }
  }
`;
