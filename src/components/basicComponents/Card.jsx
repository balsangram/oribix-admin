import { ShoppingBag } from "lucide-react";

const cardSize = {
  big: "w-[900px] min-h-[500px] p-8",
  medium: "w-[550px] min-auto p-8",
  small: "w-[350px] min-h-[300px] p-6",
  verySmall: "w-[250px] min-h-[200px] p-4",
};


export function CARD({ children , className = ''}) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10 ${className}`}>
      {children}
    </div>
  );
}

export function B_CARD({ children, className = '' }) {
  return (
    <div className={`cardSize.big  ${className}`}>
      {children}
    </div>
  );
}

export function M_CARD({ children, className = "" }) {
  return (
    <div
      className={`${cardSize.medium} bg-[#0B1220] rounded-[28px] border border-[#1E293B] shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

export function S_CARD({ children, className = '' }) {
  return (
    <div className={`cardSize.small ${className}`}>
      {children}
    </div>
  );
}


export function D_CARD({
  title,
  value,
  change,
  icon = <ShoppingBag size={20} />,
  chart,
  className = "",
}) {
  return (
    <div
      className={`w-[280px] h-[130px] bg-white rounded-2xl border border-gray-200 shadow-md p-5 flex justify-between ${className}`}
    >
      <div className="flex flex-col justify-between">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2F9BF3]">
          {icon}
        </div>
        <div>
          <h2 className="text-4xl font-bold">{value}</h2>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <p className="text-sm uppercase text-gray-500 font-semibold">
          {title}
        </p>

        {chart}
      </div>
    </div>
  );
}