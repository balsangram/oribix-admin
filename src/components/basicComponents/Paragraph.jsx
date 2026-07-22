const colors = {
  white: "text-white",
  black: "text-black",
  gray: "text-gray-400",
  blue: "text-blue-500",
};

export function P({
  children,
  color = "gray",
  className = "",
}) {
  return (
    <p className={`text-base mb-1 ${colors[color]} ${className}`}>
      {children}
    </p>
  );
}

export function SMALL_P({
  children,
  color = "gray",
  className = "",
}) {
  return (
    <p className={`text-sm ${colors[color]} ${className}`}>
      {children}
    </p>
  );
}