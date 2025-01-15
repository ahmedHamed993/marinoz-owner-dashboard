import { useState } from "react";
// router
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
// components
import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import { gql, useMutation } from "@apollo/client";
import fireAlert from "../../../helpers/fireAlert";
import { MenuItem } from "@mui/material";
const DELETE_AVAILABILITY = gql`
  mutation MyMutation($id: bigint!) {
    delete_rental_availabilities(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const RentalAvailabilitiesActions = ({ availabilityId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");
  const editAction = () => navigate(`/rental-availabilities/${availabilityId}`);
  const [deleteAvailability, { data, loading, error }] =
    useMutation(DELETE_AVAILABILITY);
  const handleDelete = async () => {
    try {
      const response = await deleteAvailability({
        variables: {
          id: availabilityId,
        },
      });
      setOpen(false);
      fireAlert("Deleted successfully", "success");
    } catch (err) {
      fireAlert(err?.message, "success");
    }
  };
  return (
    <div>
      <>
        <ButtonMenuActions
          editAction={editAction}
          deleteAction={() => setOpen(true)}
          disabled={false}
        >
          <MenuItem
            component={Link}
            to={`/addons?availabilityId=${availabilityId}&key=${key}&value=${value}&queryKey=GET_RENTAL_AVAILABILITY_ADDONS`}
          >
            Addons
          </MenuItem>
        </ButtonMenuActions>

        <ConfirmationAlert
          open={open}
          setOpen={setOpen}
          dialogTitle={"Delete Rental"}
          dialgoMessage="Are you sure you want to delete this rental?"
          confirmFn={handleDelete}
        />
      </>
    </div>
  );
};

export default RentalAvailabilitiesActions;
