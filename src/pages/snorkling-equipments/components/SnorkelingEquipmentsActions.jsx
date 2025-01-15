import { useState } from "react";
// router
import { useSearchParams } from "react-router";
// components
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import { gql, useMutation } from "@apollo/client";
import fireAlert from "../../../helpers/fireAlert";
import { Button } from "@mui/material";

const DELETE_TOUR_EQUIPMENT = gql`
  mutation MyMutation($id: bigint!) {
    delete_tour_snorkeling_equipment(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_RENTAL_EQUIPMENT = gql`
  mutation MyMutation($id: bigint!) {
    delete_rental_snorkeling_equipment(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_SUITE_EQUIPMENT = gql`
  mutation MyMutation($id: bigint!) {
    delete_suite_snorkeling_equipment(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_EVENT_EQUIPMENT = gql`
  mutation MyMutation($id: bigint!) {
    delete_event_snorkeling_equipment(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_QUERY = {
  tour_id:DELETE_TOUR_EQUIPMENT,
  rental_id:DELETE_RENTAL_EQUIPMENT,
  suite_id:DELETE_SUITE_EQUIPMENT,
  event_id:DELETE_EVENT_EQUIPMENT
}

const SnorkelingEquipmentsActions = ({ equipmentId }) => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const [deleteEquipment, { data, loading, error }] = useMutation(DELETE_QUERY[key]);
  const handleDelete = async () => {
    try {
      const response = await deleteEquipment({
        variables: {
          id: equipmentId,
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
        dialogTitle={"Delete Snorkeling Equipment"}
        dialgoMessage="Are you sure you want to delete this Equipment?"
        confirmFn={handleDelete}
      />
    </>
  );
};

export default SnorkelingEquipmentsActions;
