import React from 'react'
// fetch 
import { useQuery } from '@apollo/client';
import {GET_CUSTOM_EVENTS_REQUESTS} from "./queries";
import { Box, Divider, Stack, Typography } from '@mui/material';

const CustomEventsRequests = () => {
    const {data,loading,error} = useQuery(GET_CUSTOM_EVENTS_REQUESTS);
  return loading? <p>loading...</p> : (
    <Stack>
        <Typography variant="h5">Custom Events Requests</Typography>
        <Box sx={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
        }}>
            {data?.custom_event_requests?.map((event)=>{
               return (
                <Stack
                divider={<Divider />}
                sx={{
                    border:"1px solid #ccc",
                    borderRadius:"5px",
                    padding:"10px",
                    margin:"10px",
                    backgroundColor:"#fff",
                    gap:'8px'
                }}>
                    <Typography variant="body1">Activities : {event?.activities}</Typography>
                    <Typography variant="body1">Caterings : {event?.caterings}</Typography>
                    <Typography variant="body1">Event Type : {event?.event_type?.type}</Typography>
                    <Typography variant="body1">Fishing Equipments : {event?.fishing_equipments}</Typography>
                    <Typography variant="body1">Food Beverages : {event?.food_beverages}</Typography>
                    <Typography variant="body1">Marine Attractions : {event?.marine_attractions}</Typography>
                    <Typography variant="body1">Snorkeling Equipments : {event?.things_to_do}</Typography>
                    <Typography variant="body1">Things To Do : {event?.snorkeling_equipments}</Typography>
                    <Typography variant="body1">Transportations : {event?.transportations}</Typography>
                    <Typography variant="body1">Trip Type : {event?.trip_types}</Typography>
                    <Typography variant="body1">Water Sports : {event?.water_sports}</Typography>
                    <Typography variant="body1">Note : {event?.note}</Typography>
                    <Typography variant="body1">Client Name : {event?.client?.name}</Typography>
                    <Typography variant="body1">Client Email : {event?.client?.email}</Typography>
                    <Typography variant="body1">Client Phone : {event?.client?.phone_number}</Typography>
                </Stack>
               )
            })}
        </Box>
    </Stack>
  )
}

export default CustomEventsRequests
