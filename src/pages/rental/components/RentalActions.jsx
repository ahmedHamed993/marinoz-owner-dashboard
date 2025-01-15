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
const DELETE_RENTAL = gql`
  mutation MyMutation($id: bigint!) {
    delete_rentals(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const RentalActions = ({ rentalId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const editAction = () => navigate(`/rental/${rentalId}`);
  const [deleteTour, { data, loading, error }] = useMutation(DELETE_RENTAL);
  const handleDelete = async () => {
    try {
      const response = await deleteTour({
        variables: {
          id: rentalId,
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
          to={`/rental-availabilities?key=rental_id&value=${rentalId}&queryKey=GET_RENTALS_AVAILABILITY`}
        >
          Availability
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/activities?key=rental_id&value=${rentalId}&queryKey=GET_RENTAL_ACTIVITIES`}
        >
          Activities
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/catering?key=rental_id&value=${rentalId}&queryKey=GET_RENTAL_CATERING`}
        >
          Catering
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/transportation?key=rental_id&value=${rentalId}&queryKey=GET_RENTAL_TRANSPORTATION`}
        >
          Transportation
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/water-sports?key=rental_id&value=${rentalId}&queryKey=GET_RENTAL_WATER_SPORTS`}
        >
          Water Sports
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/food-beverages?key=rental_id&value=${rentalId}&queryKey=GET_RENTAL_FOOD_BEVERAGES`}
        >
          Food Beverages
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/fishing-equipments?key=rental_id&value=${rentalId}&queryKey=GET_RENTAL_FISHING_EQUIPMENT`}
        >
          Fishing Equipments
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/snorkeling-equipments?key=rental_id&value=${rentalId}&queryKey=GET_RENTAL_SNORKELING_EQUIPMENT`}
        >
          Snorkling Equipments
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/marine-attractions?key=rental_id&value=${rentalId}&queryKey=GET_RENTAL_MARINE_ATTRACTIONS`}
        >
          Marine Attractions
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/things-to-do?key=rental_id&value=${rentalId}&queryKey=GET_RENTAL_THINGS_TO_DO`}
        >
          Things To Do
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/trip-types?key=rental_id&value=${rentalId}&queryKey=GET_RENTAL_TRIP_TYPES`}
        >
          Trip Types
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/reviews?key=rental_id&value=${rentalId}&queryKey=GET_RENTAL_REVIEWS`}
        >
          Reviews
        </MenuItem>
      </ButtonMenuActions>

      <ConfirmationAlert
        open={open}
        setOpen={setOpen}
        dialogTitle={"Delete Rental"}
        dialgoMessage="Are you sure you want to delete this rental?"
        confirmFn={handleDelete}
      />
    </>
  );
};

export default RentalActions;
