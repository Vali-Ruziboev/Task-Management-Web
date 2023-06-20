const DropdownMenu = ({ children, items }) => {
  return (
    <div>
      <div className="peer cursor-pointer">{children}</div>
      <div className="hidden peer-hover:flex hover:flex absolute bg-white rounded-md shadow-md">
        {items?.map((item, index) => (
          <button
            className="py-2 px-6 hover:bg-gray-100/50"
            key={index}
            onClick={item.onClick}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
