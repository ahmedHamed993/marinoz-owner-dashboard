import { useState } from "react";
// router
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import { gql, useMutation } from "@apollo/client";
import fireAlert from "../../../helpers/fireAlert";
import { Button, MenuItem } from "@mui/material";

const DELETE_TOUR_TRIP_TYPE = gql`
  mutation MyMutation($id: bigint!) {
    delete_tour_trip_types(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
const DELETE_RENTAL_TRIP_TYPE = gql`
  mutation MyMutation($id: bigint!) {
    delete_rental_trip_types(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
const DELETE_SUITE_TRIP_TYPE = gql`
  mutation MyMutation($id: bigint!) {
    delete_suite_trip_types(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
const DELETE_EVENT_TRIP_TYPE = gql`
  mutation MyMutation($id: bigint!) {
    delete_event_trip_types(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_QUERY = {
  tour_id:DELETE_TOUR_TRIP_TYPE,
  rental_id:DELETE_RENTAL_TRIP_TYPE,
  suite_id:DELETE_SUITE_TRIP_TYPE,
  event_id:DELETE_EVENT_TRIP_TYPE
}
const TripTypesActions = ({ typeId }) => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");

  const [deleteType, { data, loading, error }] = useMutation(DELETE_QUERY[key]);
  const handleDelete = async () => {
    try {
      const response = await deleteType({
        variables: {
          id: typeId,
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
        dialogTitle={"Delete Type"}
        dialgoMessage="Are you sure you want to delete this Type?"
        confirmFn={handleDelete}
      />
    </>
  );
};

export default TripTypesActions;
