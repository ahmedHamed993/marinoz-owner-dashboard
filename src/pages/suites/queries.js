import {gql} from "@apollo/client"

export const GET_SUITES = gql`
 query MyQuery($ownerId: uuid!) {
    suites(where: {owner_id: {_eq: $ownerId}}) {
      id
      name
      status
      description
    }
  }
`