import { ArrowRight } from "lucide-react";

export function BUTTON({
  children,
  className = "",
  onClick = () => {},
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-12 bg-[#2F9BF3] hover:bg-[#1E88E5] text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all ${className}`}
    >
      <span>{children}</span>
      
      <ArrowRight
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </button>
  );
}