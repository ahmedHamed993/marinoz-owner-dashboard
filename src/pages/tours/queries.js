import { gql } from "@apollo/client";

export const GET_TOURS = gql`
  query MyQuery($ownerId: uuid!)  {
    tours(where: {owner_id: {_eq: $ownerId}}){
      id
      name
      status
      description
    }
  }
`;
