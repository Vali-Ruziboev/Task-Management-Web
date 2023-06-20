const Input = ({
  label = "",
  placeholder = "",
  name = "",
  type = "text",
  register = "",
  error = null,
  inputClass = "",
  labelClass = "",
  spanClass = "",
}) => {
  return (
    <span className={`flex flex-col ${spanClass}`}>
      <label className={labelClass} htmlFor={name}>
        {label}:
      </label>
      <input
        className={`border-b border-b-200 p-1 rounded-sm outline-none ${
          error && "border-b-red-600 text-red-600"
        } ${inputClass}`}
        type={type}
        id={name}
        name={name}
        required
        placeholder={placeholder}
        {...register}
      />
      <p className="text-red-600">{error && error.message}</p>
    </span>
  );
};

export default Input;
