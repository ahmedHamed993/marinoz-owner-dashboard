import {gql} from "@apollo/client";

export const GET_CUSTOM_EVENTS_REQUESTS = gql`
    query MyQuery {
        custom_event_requests {
            activities
            caterings
            client {
                email
                address
                name
                phone_number
            }
            event_type {
                type
                description
                id
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