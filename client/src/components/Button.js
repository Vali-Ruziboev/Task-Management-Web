const Button = ({ className, children, ...rest }) => {
  return (
    <button
      className={`px-4 py-2 border rounded-md bg-blue-400 text-white active:translate-y-1 active:scale-90 transition-all duration-300 ease-out ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
