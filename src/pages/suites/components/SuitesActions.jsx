import { useState } from "react";
// router
import { Link, useNavigate } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import fireAlert from "../../../helpers/fireAlert";
import { gql, useMutation } from "@apollo/client";
import { MenuItem } from "@mui/material";

const DELETE_SUITES = gql`
  mutation MyMutation($id: bigint!) {
    delete_suites(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
const SuitesActions = ({suiteId}) => {
    const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const editAction = () => navigate(`/suites/${suiteId}`);
  const [deleteSuite, { data, loading, error }] = useMutation(DELETE_SUITES);
  const handleDelete = async () => {
    try {
      const response = await deleteSuite({
        variables: {
          id: suiteId,
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
          to={`/availabilities?key=suite_id&value=${suiteId}&queryKey=GET_SUITES_AVAILABILITY`}
        >
          Availability
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/activities?key=suite_id&value=${suiteId}&queryKey=GET_SUITE_ACTIVITIES`}
        >
          Activities
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/catering?key=suite_id&value=${suiteId}&queryKey=GET_SUITE_CATERING`}
        >
          Catering
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/transportation?key=suite_id&value=${suiteId}&queryKey=GET_SUITE_TRANSPORTATION`}
        >
          Transportation
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/water-sports?key=suite_id&value=${suiteId}&queryKey=GET_SUITE_WATER_SPORTS`}
        >
          Water Sports
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/food-beverages?key=suite_id&value=${suiteId}&queryKey=GET_SUITE_FOOD_BEVERAGES`}
        >
          Food Beverages
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/fishing-equipments?key=suite_id&value=${suiteId}&queryKey=GET_SUITE_FISHING_EQUIPMENT`}
        >
          Fishing Equipments
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/snorkeling-equipments?key=suite_id&value=${suiteId}&queryKey=GET_SUITE_SNORKELING_EQUIPMENT`}
        >
          Snorkling Equipments
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/marine-attractions?key=suite_id&value=${suiteId}&queryKey=GET_SUITE_MARINE_ATTRACTIONS`}
        >
          Marine Attractions
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/things-to-do?key=suite_id&value=${suiteId}&queryKey=GET_SUITE_THINGS_TO_DO`}
        >
          Things To Do
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/trip-types?key=suite_id&value=${suiteId}&queryKey=GET_SUITE_TRIP_TYPES`}
        >
          Trip Types
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/reviews?key=suite_id&value=${suiteId}&queryKey=GET_SUTIE_REVIEWS`}
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
  )
}

export default SuitesActions
