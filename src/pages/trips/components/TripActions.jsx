import { useState } from "react";
// router
import { useNavigate } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
const TripActions = ({ tripId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const editAction = () => navigate(`/trips/${tripId}`);
  return (
    <>
      <ButtonMenuActions
        editAction={editAction}
        deleteAction={() => setOpen(true)}
        disabled={false}
      />

      <ConfirmationAlert
        open={open}
        setOpen={setOpen}
        dialogTitle={"Delete Trip"}
        dialgoMessage="Are you sure you want to delete this trip?"
        confirmFn={() => alert("delete")}
      />
    </>
  );
};

export default TripActions;
