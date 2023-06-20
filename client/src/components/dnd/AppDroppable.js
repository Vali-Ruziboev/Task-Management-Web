import { Droppable } from "react-beautiful-dnd";
import { useStrictDroppable } from "../../hooks/useStrictDroppable";

function AppDroppable({ id, columnName = "", children }) {
  const [enabled] = useStrictDroppable(false);

  return (
    enabled && (
      <Droppable key={id} droppableId={id}>
        {(droppableprovided, _) => (
          <div
            ref={droppableprovided.innerRef}
            {...droppableprovided.droppableProps}
            className="bg-gray-100 h-[100%] w-[30%] min-w-[20rem] rounded-md m-2 shadow-sm inline-block align-top"
          >
            <div className="shadow-sm p-2 capitalize font-semibold text-center">
              {columnName}
            </div>
            <div className="p-6">{children}</div>
            {droppableprovided.placeholder}
          </div>
        )}
      </Droppable>
    )
  );
}

export default AppDroppable;
