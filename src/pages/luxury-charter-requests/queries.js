import {gql} from "@apollo/client";

export const GET_LUXURY_CHARTER_REQUESTS = gql`
    query MyQuery {
        luxury_charter_requests {
            activities
            caterings
            client {
                email
                address
                name
                phone_number
            }
            food_beverages
            fishing_equipments
            marine_attractions
            note
            snorkeling_equipments
            things_to_do
            transportations
            trip_types
            water_sports
        }
    }
`