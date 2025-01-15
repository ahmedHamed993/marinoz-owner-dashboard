import {gql} from "@apollo/client";

export const GET_YACHT_RESALES = gql`
    query MyQuery($id: bigint ) {
    resales(where: {yacht_id: {_eq: $id}}) {
        id
        additional_info
        created_at
        engine_power
        fuel_consumption
        fuel_tank
        max_speed
        num_of_crew
        owner_id
        selling_price
        speed
        updated_at
        water_tank
        yacht_id
    }
}`