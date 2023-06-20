const TextArea = ({
  label = "",
  placeholder = "",
  name = "",
  register = "",
  error = null,
  textAreaClass = "",
  labelClass = "",
  spanClass = "",
}) => {
  return (
    <div className={`flex flex-col relative ${spanClass}`}>
      <label className={labelClass} htmlFor={name}>
        {label}:
      </label>
      <textarea
        className={`border-b border-b-200 p-1 rounded-sm outline-none ${
          error && "border-b-red-600 text-red-600"
        } ${textAreaClass}`}
        id={name}
        name={name}
        required
        placeholder={placeholder}
        {...register}
      />
      <p className="text-red-600">{error && error.message}</p>
    </div>
  );
};

export default TextArea;
