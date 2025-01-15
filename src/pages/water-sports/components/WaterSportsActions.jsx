import { useState } from "react";
// router
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import { gql, useMutation } from "@apollo/client";
import fireAlert from "../../../helpers/fireAlert";
import { Button, MenuItem } from "@mui/material";

const DELETE_TOUR_WATER_SPORTS = gql`
  mutation MyMutation($id: bigint!) {
    delete_tour_water_sports(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_RENTAL_WATER_SPORTS = gql`
  mutation MyMutation($id: bigint!) {
    delete_rental_water_sports(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_SUITE_WATER_SPORTS = gql`
  mutation MyMutation($id: bigint!) {
    delete_suite_water_sports(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_EVENT_WATER_SPORTS = gql`
  mutation MyMutation($id: bigint!) {
    delete_event_water_sports(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_QUERY = {
  tour_id:DELETE_TOUR_WATER_SPORTS,
  rental_id:DELETE_RENTAL_WATER_SPORTS,
  suite_id:DELETE_SUITE_WATER_SPORTS,
  event_id:DELETE_EVENT_WATER_SPORTS
}
const WaterSportsActions = ({ sportId }) => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
 
  const [deleteSport, { data, loading, error }] = useMutation(DELETE_QUERY[key]);
  const handleDelete = async () => {
    try {
      const response = await deleteSport({
        variables: {
          id: sportId,
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
        dialogTitle={"Delete Rental"}
        dialgoMessage="Are you sure you want to delete this rental?"
        confirmFn={handleDelete}
      />
    </>
  );
};

export default WaterSportsActions;
