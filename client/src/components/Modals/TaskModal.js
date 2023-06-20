import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { close } from "../../features/modal/taskModalSlice";
import { add as addTask, columns, update } from "../../features/task/taskSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { taskSchema } from "../../utils/validationSchemas";
import TextArea from "../TextArea";
import Button from "../Button";
import { useEffect } from "react";
import {
  useCreateTaskMutation,
  useEditTaskMutation,
} from "../../services/taskAPI";
import { toast } from "react-toastify";
import { handleResponse } from "../../utils/helpers";

const TaskModal = () => {
  const dispatch = useDispatch();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useEditTaskMutation();
  const { add, edit } = useSelector((state) => state.taskModal);
  const { values } = useSelector((state) => state.task);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (edit) {
      await handleResponse(updateTask(data));
    } else {
      const todos = values[columns.TO_DO];
      await handleResponse(
        createTask({
          ...data,
          index: todos.length,
          column_id: columns.TO_DO,
        })
      );
    }
    dispatch(close());
    reset();
  };

  const handleClose = () => {
    dispatch(close());
  };

  useEffect(() => {
    reset(edit ? edit : { title: "", description: "" });
  }, [edit]);
  return (
    <Modal open={add || edit} title="Add new task" onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 h-[80%]">
        <Input
          label="Title"
          name="title"
          placeholder="Title"
          type="text"
          register={register("title")}
          error={errors.title}
        />
        <TextArea
          label="Description"
          name="description"
          placeholder="Description"
          register={register("description")}
          error={errors.description}
          spanClass="!h-[80%]"
        />

        <Button type="submit">Create</Button>
      </form>
    </Modal>
  );
};

export default TaskModal;
