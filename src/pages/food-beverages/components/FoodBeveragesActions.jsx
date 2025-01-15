import { useState } from "react";
// router
import { useSearchParams } from "react-router";
// components
import ConfirmationAlert from "../../../components/alert/ConfirmationAlert";
import { gql, useMutation } from "@apollo/client";
import fireAlert from "../../../helpers/fireAlert";
import { Button } from "@mui/material";

const DELETE_TOUR_FOOD_BEVERAGES = gql`
  mutation MyMutation($id: bigint!) {
    delete_tour_food_beverages(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_RENTAL_FOOD_BEVERAGES = gql`
  mutation MyMutation($id: bigint!) {
    delete_rental_food_beverages(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_SUITE_FOOD_BEVERAGES = gql`
  mutation MyMutation($id: bigint!) {
    delete_suite_food_beverages(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_EVENT_FOOD_BEVERAGES = gql`
  mutation MyMutation($id: bigint!) {
    delete_event_food_beverages(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DELETE_QUERY = {
  tour_id:DELETE_TOUR_FOOD_BEVERAGES,
  rental_id:DELETE_RENTAL_FOOD_BEVERAGES,
  suite_id:DELETE_SUITE_FOOD_BEVERAGES,
  event_id:DELETE_EVENT_FOOD_BEVERAGES
}

const FoodBeveragesActions = ({ foodBeverageId }) => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
 
  const [deleteFoodBeverage, { data, loading, error }] =
    useMutation(DELETE_QUERY[key]);
  const handleDelete = async () => {
    try {
      const response = await deleteFoodBeverage({
        variables: {
          id: foodBeverageId,
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
      <Button onClick={() => setOpen(true)} color="error" disabled={loading}>
        Delete
      </Button>
      <ConfirmationAlert
        open={open}
        setOpen={setOpen}
        dialogTitle={"Delete Food Beverage"}
        dialgoMessage="Are you sure you want to delete this Food Beverage?"
        confirmFn={handleDelete}
      />
    </>
  );
};

export default FoodBeveragesActions;
