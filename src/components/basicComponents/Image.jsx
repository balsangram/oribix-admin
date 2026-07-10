export function IMG({
  src,
  alt = "",
  width = "auto",
  height = "auto",
  className = "",
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`bg-transparent object-contain ${className}`}
    />
  );
}