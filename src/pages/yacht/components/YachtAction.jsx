import { useState } from "react";
// react-redux
import { useSelector } from "react-redux";
// router
import { Link, useNavigate } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
// fetch
import callApi from "../../../helpers/callApi";
import fireAlert from "../../../helpers/fireAlert";
import { MenuItem } from "@mui/material";
const YachtAction = ({ yachtId }) => {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.user.userToken);

  const editAction = () => navigate(`/yacht/${yachtId}`);
  const deleteYacht = () => {
    callApi(userToken, "application/json")
      .post(`/owners/yachts/${yachtId}`)
      .then((data) => {
        if (data?.status == 200) {
          fireAlert("Yacht deleted successfully", "success");
          return;
        } else {
          throw data;
        }
      })
      .catch((error) => {
        fireAlert(error?.response?.data?.message || error.message, "error");
      });
  };

  return deleted ? (
    <p>item deleted</p>
  ) : (
    <>
      <ButtonMenuActions
        editAction={editAction}
        deleteAction={() => setOpen(true)}
      >
        <MenuItem component={Link} to={`/yacht-resales?yachtId=${yachtId}`}>
          Yacht Resales
        </MenuItem>
      </ButtonMenuActions>

      <ConfirmationAlert
        open={open}
        setOpen={setOpen}
        dialogTitle={"Delete Yacht"}
        dialgoMessage="Are you sure you want to delete this Yacht?"
        confirmFn={deleteYacht}
      />
    </>
  );
};

export default YachtAction;
