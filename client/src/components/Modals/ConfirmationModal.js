import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { close } from "../../features/modal/taskModalSlice";
import Button from "../Button";

const ConfirmationModal = ({
  open,
  title = "Delete Confirmation",
  item,
  confirmTitle = "Confirm",
  onConfirm,
}) => {
  const dispatch = useDispatch();

  return (
    <Modal
      className="w-max"
      onClose={() => dispatch(close())}
      open={open}
      title={title}
    >
      <div className="p-2">
        <p>
          Are you sure you wanna delete{" "}
          <span className="text-red-500">{item}</span>?
        </p>

        <div className="space-x-2 mt-4">
          <Button
            onClick={() => dispatch(close())}
            className={"bg-white !text-gray-900 border-gray-900"}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm}>{confirmTitle}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
