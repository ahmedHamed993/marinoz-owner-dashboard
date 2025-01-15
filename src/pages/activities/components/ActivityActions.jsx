import { useState } from "react";
// router
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import { gql, useMutation } from "@apollo/client";
import fireAlert from "../../../helpers/fireAlert";
import { Button, MenuItem } from "@mui/material";

const DELETE_TOUR_ACTIVITY = gql`
  mutation MyMutation($id: bigint!) {
    delete_tour_activities(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_RENTAL_ACTIVITY = gql`
  mutation MyMutation($id: bigint!) {
    delete_rental_activities(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_SUITE_ACTIVITY = gql`
  mutation MyMutation($id: bigint!) {
    delete_suite_activities(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_EVENT_ACTIVITY = gql`
  mutation MyMutation($id: bigint!) {
    delete_event_activities(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_QUERY = {
  tour_id:DELETE_TOUR_ACTIVITY,
  rental_id:DELETE_RENTAL_ACTIVITY,
  suite_id:DELETE_SUITE_ACTIVITY,
  event_id:DELETE_EVENT_ACTIVITY
}
const ActivityActions = ({ activityId }) => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");

  const [deleteActivity, { data, loading, error }] = useMutation(DELETE_QUERY[key]);
  const handleDelete = async () => {
    try {
      const response = await deleteActivity({
        variables: {
          id: activityId,
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
      <Button onClick={() => setOpen(true)} color="error">
        Delete
      </Button>
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

export default ActivityActions;
