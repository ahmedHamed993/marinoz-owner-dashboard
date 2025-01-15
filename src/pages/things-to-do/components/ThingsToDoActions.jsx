import { useState } from "react";
// router
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import { gql, useMutation } from "@apollo/client";
import fireAlert from "../../../helpers/fireAlert";
import { Button, MenuItem } from "@mui/material";

const DELETE_TOUR_THING = gql`
  mutation MyMutation($id: bigint!) {
    delete_tour_thing_to_dos(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_RENTAL_THING = gql`
  mutation MyMutation($id: bigint!) {
    delete_rental_thing_to_dos(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_SUITE_THING = gql`
  mutation MyMutation($id: bigint!) {
    delete_suite_thing_to_dos(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_EVENT_THING = gql`
  mutation MyMutation($id: bigint!) {
    delete_event_thing_to_dos(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;


const DELETE_QUERY = {
  tour_id:DELETE_TOUR_THING,
  rental_id:DELETE_RENTAL_THING,
  suite_id:DELETE_SUITE_THING,
  event_id:DELETE_EVENT_THING
}

const ThingsToDoActions = ({ thingId }) => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");

  const [deleteThing, { data, loading, error }] = useMutation(DELETE_QUERY[key]);
  const handleDelete = async () => {
    try {
      const response = await deleteThing({
        variables: {
          id: thingId,
        },
      });
      setOpen(false);
      fireAlert("Deleted successfully", "success");
    } catch (err) {
      fireAlert(err?.message, "error");
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
        dialogTitle={"Delete Things To Do"}
        dialgoMessage="Are you sure you want to delete this Things To Do?"
        confirmFn={handleDelete}
      />
    </>
  );
};

export default ThingsToDoActions;
