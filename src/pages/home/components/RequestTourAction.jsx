import ButtonMenuActions from "../../../components/buttons/ButtonMenuActions";

const RequestTourAction = ({ requestId }) => {
  return (
    <ButtonMenuActions
      editAction={() => alert("edit")}
      deleteAction={() => alert("delete")}
    />
  );
};

export default RequestTourAction;
