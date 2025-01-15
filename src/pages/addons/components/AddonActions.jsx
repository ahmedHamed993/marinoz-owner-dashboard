import { useState } from "react";
// router
import { useNavigate, useParams, useSearchParams } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import fireAlert from "../../../helpers/fireAlert";
import { gql, useMutation } from "@apollo/client";
const DELETE_ADDON = gql`
  mutation MyMutation($id: bigint!) {
    delete_addons(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
const DELETE_RENTAL_ADDON = gql`
  mutation MyMutation($id: bigint!) {
    delete_rental_addons(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
const DELETE_SUITE_ADDON = gql`
  mutation MyMutation($id: bigint!) {
    delete_suite_addons(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
const AddonActions = ({ addonId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const DELETE_QUERY =
    key === "tour_id"
      ? DELETE_ADDON
      : key === "rental_id"
        ? DELETE_RENTAL_ADDON
        : DELETE_SUITE_ADDON;
  const editAction = () =>
    navigate(`/addons/${addonId}?key=${key}&value=${value}`);
  const [deleteAddon, { data, loading, error }] = useMutation(DELETE_QUERY);
  const handleDelete = async () => {
    try {
      const response = await deleteAddon({
        variables: {
          id: addonId,
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
      <ButtonMenuActions
        editAction={editAction}
        deleteAction={() => setOpen(true)}
        disabled={loading}
      />

      <ConfirmationAlert
        open={open}
        setOpen={setOpen}
        dialogTitle={"Delete Addon"}
        dialgoMessage="Are you sure you want to delete this Addon?"
        confirmFn={handleDelete}
      />
    </>
  );
};

export default AddonActions;
