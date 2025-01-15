import { useState } from "react";
// router
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import { gql, useMutation } from "@apollo/client";
import fireAlert from "../../../helpers/fireAlert";
import { Button, MenuItem } from "@mui/material";

const DELETE_CATERING = gql`
  mutation MyMutation($id: bigint!) {
    delete_tour_caterings(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_RENTAL_CATERING = gql`
  mutation MyMutation($id: bigint!) {
    delete_rental_caterings(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_SUITE_CATERING = gql`
  mutation MyMutation($id: bigint!) {
    delete_suite_caterings(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_EVENT_CATERING = gql`
  mutation MyMutation($id: bigint!) {
    delete_event_caterings(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_QUERY = {
  tour_id:DELETE_CATERING,
  rental_id:DELETE_RENTAL_CATERING,
  suite_id:DELETE_SUITE_CATERING,
  event_id:DELETE_EVENT_CATERING
}
const CateringActions = ({ cateringId }) => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
 
  const [deleteCatring, { data, loading, error }] = useMutation(DELETE_QUERY[key]);
  const handleDelete = async () => {
    try {
      const response = await deleteCatring({
        variables: {
          id: cateringId,
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

export default CateringActions;
