const colors = {
  white: "text-white",
  black: "text-black",
  blue: "text-blue-500",
  gray: "text-gray-400",
};

export function L({
  children,
  href = "#",
  target = "_blank",
  color = "blue",
  className = "",
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`${colors[color]} hover:underline transition-colors duration-200 ${className}`}
    >
      {children}
    </a>
  );
}