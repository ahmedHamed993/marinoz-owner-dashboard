import { useState } from "react";
// router
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import { gql, useMutation } from "@apollo/client";
import fireAlert from "../../../helpers/fireAlert";
import { MenuItem } from "@mui/material";
const DELETE_AVAILABILITY = gql`
  mutation MyMutation($id: bigint!) {
    delete_availabilities(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_EVENT_AVAILABILITY = gql`
  mutation MyMutation($id: bigint!) {
    delete_event_availabilities(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;


const GET_ADDONS_QUERY = {
  tour_id:"GET_TOUR_AVAILABILITY_ADDONS",
  rental_id:"GET_RENTAL_AVAILABILITY_ADDONS",
  event_id:"GET_EVENT_AVAILABILITY_ADDONS",
  suite_id:"GET_SUITE_AVAILABILITY_ADDONS",
}

const AvailabilityActions = ({ availabilityId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");
  const DELETE_QUERY  = key === "tour_id" ? DELETE_AVAILABILITY : DELETE_EVENT_AVAILABILITY;
  const editAction = () =>
    navigate(`/availabilities/${availabilityId}?key=${key}&value=${value}`);
  const [deleteAvailability, { data, loading, error }] =
    useMutation(DELETE_QUERY);
  const handleDelete = async () => {
    try {
      const response = await deleteAvailability({
        variables: {
          id: availabilityId,
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
          to={`/addons?availabilityId=${availabilityId}&key=${key}&value=${value}&queryKey=${GET_ADDONS_QUERY[key]}`}
        >
          Addons
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

export default AvailabilityActions;
