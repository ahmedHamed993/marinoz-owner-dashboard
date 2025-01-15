import { gql } from "@apollo/client";

export const reviewsQueries = {
  GET_TOUR_REVIEWS: gql`
    query MyQuery {
      tour_reviews {
        id
        stars
        comment
        client {
          id
          name
        }
      }
    }
  `,
  GET_RENTAL_REVIEWS: gql`
    query MyQuery {
      rental_reviews {
        id
        stars
        comment
        # client {
        #     id
        #     name
        # }
      }
    }
  `,
   GET_EVENT_REVIEWS: gql`
   query MyQuery {
     event_reviews {
       id
       stars
       comment
       # client {
       #     id
       #     name
       # }
     }
   }
 `,
  GET_SUTIE_REVIEWS: gql`
  query MyQuery {
    suite_reviews {
      id
      stars
      comment
      # client {
      #     id
      #     name
      # }
    }
  }
`,
};
