const colors = {
  white: "text-white",
  black: "text-black",
  blue: "text-blue-500",
};

export function H1({
  children,
  color = "black",
  className = "",
}) {
  return (
    <h1
      className={`text-2xl font-bold mb-4 ${colors[color]} ${className}`}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  color = "black",
  className = "",
}) {
  return (
    <h2
      className={`text-xl font-semibold mb-3 ${colors[color]} ${className}`}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  color = "black",
  className = "",
}) {
  return (
    <h3
      className={`text-lg font-medium mb-2 ${colors[color]} ${className}`}
    >
      {children}
    </h3>
  );
}