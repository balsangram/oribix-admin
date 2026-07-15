import React from "react";
import { VS_CARD } from "../../../components/basicComponents/Card";

const pipelineData = [
  {
    title: "Cart → Checkout",
    value: "64%",
    valueColor: "text-slate-900",
    subtitle: "↑ 3% vs 7d",
    subtitleColor: "text-green-600",
  },
  {
    title: "Checkout → Placed",
    value: "82%",
    valueColor: "text-slate-900",
    subtitle: "Stable",
    subtitleColor: "text-gray-500",
  },
  {
    title: "Placed → Delivered",
    value: "91%",
    valueColor: "text-green-600",
    subtitle: "",
    subtitleColor: "",
  },
  {
    title: "Avg cycle",
    value: "38h",
    valueColor: "text-slate-900",
    subtitle: "Placed → Delivered",
    subtitleColor: "text-gray-500",
  },
];

function DemandHeatMap_A() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {pipelineData.map((item, index) => (
        <VS_CARD
          key={index}
          className="flex flex-col justify-center gap-1.5"
        >
          <p className="text-xs text-gray-500 font-medium tracking-wide">
            {item.title}
          </p>

          <h2 className={`text-3xl font-bold leading-none ${item.valueColor}`}>
            {item.value}
          </h2>

          {item.subtitle ? (
            <p className={`text-xs ${item.subtitleColor}`}>{item.subtitle}</p>
          ) : null}
        </VS_CARD>
      ))}
    </div>
  );
}

export default DemandHeatMap_A;
