const colors = {
  white: "text-white",
  black: "text-black",
  gray: "text-gray-500",
  blue: "text-blue-500",
};

const labelSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const inputSizes = {
  sm: "h-9 text-sm px-3",
  md: "h-11 text-base px-4",
  lg: "h-14 text-lg px-5",
};

export function LABEL({
  children,
  color = "black",
  size = "md",
  className = "",
}) {
  return (
    <label
      className={`block font-medium mb-2 ${colors[color]} ${labelSizes[size]} ${className}`}
    >
      {children}
    </label>
  );
}

export function INPUT({
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
  color = "black",
  size = "md",
  className = "",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full
        rounded-xl
        border
        border-gray-600
        bg-[#1B2335]
        ${colors[color]}
        placeholder:text-gray-400
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        ${inputSizes[size]}
        ${className}
      `}
    />
  );
}

export function TEXTAREA({
  placeholder = "",
  value = "",
  onChange = () => {},
  color = "black",
  size = "md",
  className = "",
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full
        rounded-xl
        border
        border-gray-600
        bg-[#1B2335]
        ${colors[color]}
        placeholder:text-gray-400
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        ${inputSizes[size]}
        min-h-[120px]
        ${className}
      `}
    />
  );
}