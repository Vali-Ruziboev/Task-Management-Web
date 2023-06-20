import { DragDropContext } from "react-beautiful-dnd";
import AppDroppable from "../components/dnd/AppDroppable";
import AppDraggable from "../components/dnd/AppDraggable";
import Add from "../icons/Add";
import TaskModal from "../components/Modals/TaskModal";
import { useDispatch, useSelector } from "react-redux";
import { actions, close, open } from "../features/modal/taskModalSlice";
import {
  columns,
  reorder,
  remove as removeTask,
  reset,
} from "../features/task/taskSlice";
import ConfirmationModal from "../components/Modals/ConfirmationModal";
import {
  useDeleteTaskMutation,
  useReorderTaskMutation,
  useTasksQuery,
} from "../services/taskAPI";
import { useEffect, useState } from "react";
import { handleResponse } from "../utils/helpers";

const Dashboard = () => {
  const { values: tasks } = useSelector((state) => state.task);
  const { data: tasksData,  } = useTasksQuery();
  const { remove } = useSelector((state) => state.taskModal);
  const [updatedColumns, setUpdatedColumns] = useState(null);
  const [deleteTask] = useDeleteTaskMutation();
  const [reorderTask] = useReorderTaskMutation();
  const dispatch = useDispatch();

  const handleDragend = (result) => {
    dispatch(reorder(result));
    const destinationId = result.destination.droppableId;
    const sourceId = result.source.droppableId;
    if (destinationId === sourceId) {
      setUpdatedColumns([sourceId]);
    } else {
      setUpdatedColumns([destinationId, sourceId]);
    }
  };

  const handleDelete = async () => {
    const res = await handleResponse(deleteTask(remove.id));
    console.log(res);
    dispatch(removeTask(remove));
    setUpdatedColumns([remove.column_id]);
    dispatch(close());
  };

  useEffect(() => {
    if (tasksData) {
      dispatch(reset(tasksData.data));
    }
  }, [tasksData]);

  useEffect(() => {
    if (updatedColumns) {
      let data = [];
      updatedColumns.map((column) => {
        data = [...data, ...tasks[column]];
      });
      reorderTask(data);
      setUpdatedColumns(null);
    }
  }, [handleDelete, handleDragend]);

  return (
    <div className="w-full h-full relative">
      <DragDropContext onDragEnd={handleDragend}>
        <div className=" h-full block text-center mx-auto">
          {Object.entries(columns).map((column, index) => (
            <AppDroppable
              id={column[1].toString()}
              key={index}
              columnName={column[0].split("_").join(" ").toLowerCase()}
            >
              {tasks[column[1]]?.map((task, index) => (
                <AppDraggable task={task} index={index} key={task.id}>
                  {task.title}
                </AppDraggable>
              ))}
            </AppDroppable>
          ))}
        </div>
      </DragDropContext>
      <div
        className="fixed bottom-10 right-10 p-4 rounded-full shadow-lg cursor-pointer click-bounce"
        onClick={() => dispatch(open({ type: actions.ADD }))}
      >
        <Add />
      </div>
      <TaskModal />

      <ConfirmationModal
        onConfirm={handleDelete}
        open={remove}
        item={remove?.title}
      />
    </div>
  );
};

export default Dashboard;
