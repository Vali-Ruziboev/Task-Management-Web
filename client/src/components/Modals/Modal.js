import XIcon from "../../icons/XIcon";

const Modal = ({
  open = false,
  title = "",
  onClose,
  className = "",
  children,
}) => {
  return (
    <dialog
      open={open}
      onClick={onClose}
      className="fixed w-full h-[100vh] top-0 left-0 bg-black/40 flex items-center justify-center open:opacity-100 opacity-0 transition-all ease-in-out duration-200 pointer-events-none open:pointer-events-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white p-4 rounded-md shadow-md min-w-[20rem] w-[50%] space-y-4 max-h-[90%] ${
          open ? "scale-100" : "scale-0"
        } transition-all ease-in-out duration-300 flex flex-col relative ${className}`}
      >
        <section className="flex justify-between border-b p-2">
          <h3 className="font-semibold">{title}</h3>
          <XIcon
            className="cursor-pointer click-bounce p-1 w-[2rem] h-[2rem] rounded-md"
            onClick={onClose}
          />
        </section>
        <div className="!max-h-[30%]">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
