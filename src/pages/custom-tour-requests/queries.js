import {gql} from "@apollo/client";
import {store} from "../../redux/store";
const state = store.getState();
const userId = state.user.userData.id;

export const GET_CUSTOM_TOUR_REQUESTS = gql`
    query MyQuery {
        custom_tour_requests {
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