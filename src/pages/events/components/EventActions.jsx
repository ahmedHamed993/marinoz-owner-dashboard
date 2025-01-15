import { useState } from "react";
// router
import { Link, useNavigate } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
// fetch
import { gql, useMutation } from "@apollo/client";
import fireAlert from "../../../helpers/fireAlert";
// mui
import { MenuItem } from "@mui/material";

const DELETE_EVENT = gql`
  mutation MyMutation($id: bigint!) {
    delete_events(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const EventActions = ({ eventId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const editAction = () =>
    navigate(
      `/events/${eventId}?key=event_id&value=${eventId}&queryKey=GET_EVENTS_AVAILABILITY`,
    );
  const [deleteTour, { data, loading, error }] = useMutation(DELETE_EVENT);
  const handleDelete = async () => {
    try {
      const response = await deleteTour({
        variables: {
          id: eventId,
        },
      });
      setOpen(false);
      fireAlert("Deleted successfully", "success");
    } catch (err) {
      fireAlert(err?.message, "success");
    }
  };

  return (
    <>
      <ButtonMenuActions
        editAction={editAction}
        deleteAction={() => setOpen(true)}
        disabled={false}
      >
        <MenuItem
          component={Link}
          to={`/availabilities?key=event_id&value=${eventId}&queryKey=GET_EVENTS_AVAILABILITY`}
        >
          Availability
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/activities?key=event_id&value=${eventId}&queryKey=GET_EVENTS_ACTIVITIES`}
        >
          Activities
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/catering?key=event_id&value=${eventId}&queryKey=GET_EVENT_CATERING`}
        >
          Catering
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/transportation?key=event_id&value=${eventId}&queryKey=GET_EVENT_TRANSPORTATION`}
        >
          Transportation
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/water-sports?key=event_id&value=${eventId}&queryKey=GET_EVENT_WATER_SPORTS`}
        >
          Water Sports
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/food-beverages?key=event_id&value=${eventId}&queryKey=GET_EVENT_FOOD_BEVERAGES`}
        >
          Food Beverages
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/fishing-equipments?key=event_id&value=${eventId}&queryKey=GET_EVENT_FISHING_EQUIPMENT`}
        >
          Fishing Equipments
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/snorkeling-equipments?key=event_id&value=${eventId}&queryKey=GET_EVENT_SNORKELING_EQUIPMENT`}
        >
          Snorkling Equipments
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/marine-attractions?key=event_id&value=${eventId}&queryKey=GET_EVENT_MARINE_ATTRACTIONS`}
        >
          Marine Attractions
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/things-to-do?key=event_id&value=${eventId}&queryKey=GET_EVENT_THINGS_TO_DO`}
        >
          Things To Do
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/trip-types?key=event_id&value=${eventId}&queryKey=GET_EVENT_TRIP_TYPES`}
        >
          Trip Types
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/reviews?key=event_id&value=${eventId}&queryKey=GET_EVENT_REVIEWS`}
        >
          Reviews
        </MenuItem>
      </ButtonMenuActions>

      <ConfirmationAlert
        open={open}
        setOpen={setOpen}
        dialogTitle={"Delete Event"}
        dialgoMessage="Are you sure you want to delete this event?"
        confirmFn={handleDelete}
      />
    </>
  );
};

export default EventActions;
