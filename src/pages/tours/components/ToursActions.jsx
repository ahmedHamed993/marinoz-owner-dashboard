import { useState } from "react";
// router
import { Link, useNavigate } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import fireAlert from "../../../helpers/fireAlert";
import { gql, useMutation } from "@apollo/client";
import { MenuItem } from "@mui/material";

const DELETE_TOUR = gql`
  mutation MyMutation($id: bigint!) {
    delete_tours(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const ToursActions = ({ tourId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const editAction = () => navigate(`/tours/${tourId}`);
  const [deleteTour, { data, loading, error }] = useMutation(DELETE_TOUR);
  const handleDelete = async () => {
    try {
      const response = await deleteTour({
        variables: {
          id: tourId,
        },
      });
      setOpen(false);
      fireAlert("Deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting tour:", err);
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
          to={`/availabilities?key=tour_id&value=${tourId}&queryKey=GET_TOURS_AVAILABILITY`}
        >
          Availability
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/activities?key=tour_id&value=${tourId}&queryKey=GET_TOUR_ACTIVITIES`}
        >
          Activities
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/catering?key=tour_id&value=${tourId}&queryKey=GET_TOUR_CATERING`}
        >
          Catering
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/transportation?key=tour_id&value=${tourId}&queryKey=GET_TOUR_TRANSPORTATION`}
        >
          Transportation
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/water-sports?key=tour_id&value=${tourId}&queryKey=GET_TOUR_WATER_SPORTS`}
        >
          Water Sports
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/food-beverages?key=tour_id&value=${tourId}&queryKey=GET_TOUR_FOOD_BEVERAGES`}
        >
          Food Beverages
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/fishing-equipments?key=tour_id&value=${tourId}&queryKey=GET_TOUR_FISHING_EQUIPMENT`}
        >
          Fishing Equipments
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/snorkeling-equipments?key=tour_id&value=${tourId}&queryKey=GET_TOUR_SNORKELING_EQUIPMENT`}
        >
          Snorkling Equipments
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/marine-attractions?key=tour_id&value=${tourId}&queryKey=GET_TOUR_MARINE_ATTRACTIONS`}
        >
          Marine Attractions
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/things-to-do?key=tour_id&value=${tourId}&queryKey=GET_TOUR_THINGS_TO_DO`}
        >
          Things To Do
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/trip-types?key=tour_id&value=${tourId}&queryKey=GET_TOUR_TRIP_TYPES`}
        >
          Trip Types
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/reviews?key=tour_id&value=${tourId}&queryKey=GET_TOUR_REVIEWS`}
        >
          Reviews
        </MenuItem>
      </ButtonMenuActions>

      <ConfirmationAlert
        open={open}
        setOpen={setOpen}
        dialogTitle={"Delete Rental"}
        dialgoMessage="Are you sure you want to delete this Tour?"
        confirmFn={handleDelete}
      />
    </>
  );
};

export default ToursActions;
