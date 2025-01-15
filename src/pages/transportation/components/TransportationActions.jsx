import { useState } from "react";
// router
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import { gql, useMutation } from "@apollo/client";
import fireAlert from "../../../helpers/fireAlert";
import { Button, MenuItem } from "@mui/material";

const DELETE_TOUR_TRANSPORTATION = gql`
  mutation MyMutation($id: bigint!) {
    delete_tour_transportations(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
const DELETE_RENTAL_TRANSPORTATION = gql`
  mutation MyMutation($id: bigint!) {
    delete_rental_transportations(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
const DELETE_SUITE_TRANSPORTATION = gql`
  mutation MyMutation($id: bigint!) {
    delete_suite_transportations(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
const DELETE_EVENT_TRANSPORTATION = gql`
  mutation MyMutation($id: bigint!) {
    delete_event_transportations(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_QUERY = {
  tour_id:DELETE_TOUR_TRANSPORTATION,
  rental_id:DELETE_RENTAL_TRANSPORTATION,
  suite_id:DELETE_SUITE_TRANSPORTATION,
  event_id:DELETE_EVENT_TRANSPORTATION
}
const TransportationActions = ({ transportationId }) => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const [deleteTransportation, { data, loading, error }] =
    useMutation(DELETE_QUERY[key]);

  const handleDelete = async () => {
    try {
      const response = await deleteTransportation({
        variables: {
          id: transportationId,
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
        dialogTitle={"Delete Transportation"}
        dialgoMessage="Are you sure you want to delete this transportation?"
        confirmFn={handleDelete}
      />
    </>
  );
};

export default TransportationActions;
