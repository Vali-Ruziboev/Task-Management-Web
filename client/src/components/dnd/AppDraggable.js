import { Draggable } from "react-beautiful-dnd";
import DragIndicator from "../../icons/DragIndicator";
import Delete from "../../icons/Delete";
import Edit from "../../icons/Edit";
import { useDispatch } from "react-redux";
import { actions, open } from "../../features/modal/taskModalSlice";

const AppDraggable = ({ task, index, children }) => {
  const dispatch = useDispatch();
  return (
    <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
      {(provided, _) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white px-6 py-2 min-h-[5rem] flex items-center rounded-md shadow-md my-2 space-x-1 group text-start"
        >
          <DragIndicator />
          <div className="flex-grow">{children}</div>
          <div className="hidden space-x-1 group-hover:flex">
            <Edit
              onClick={() => dispatch(open({ type: actions.EDIT, data: task }))}
              className="cursor-pointer"
            />
            <Delete
              onClick={() =>
                dispatch(open({ type: actions.REMOVE, data: task }))
              }
              className="cursor-pointer"
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default AppDraggable;
