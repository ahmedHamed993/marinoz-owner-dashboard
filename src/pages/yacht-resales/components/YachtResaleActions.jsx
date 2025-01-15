import { useState } from "react";
// router
import { Link, useNavigate } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import fireAlert from "../../../helpers/fireAlert";
import { gql, useMutation } from "@apollo/client";
import { MenuItem } from "@mui/material";

const DELETE_RESALE = gql`
  mutation MyMutation($id: bigint!) {
    delete_resales(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

const YachtResaleActions = ({resaleId}) => {
    const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const editAction = () => navigate(`/yacht-resales/${resaleId}`);
  const [deleteTour, { data, loading, error }] = useMutation(DELETE_RESALE);
  const handleDelete = async () => {
    try {
      const response = await deleteTour({
        variables: {
          id: resaleId,
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
      
    </ButtonMenuActions>

    <ConfirmationAlert
      open={open}
      setOpen={setOpen}
      dialogTitle={"Delete Rental"}
      dialgoMessage="Are you sure you want to delete this Tour?"
      confirmFn={handleDelete}
    />
  </>
);
}

export default YachtResaleActions
