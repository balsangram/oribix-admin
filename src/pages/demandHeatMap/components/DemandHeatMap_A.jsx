import React from "react";
import { VS_CARD } from "../../../components/basicComponents/Card";

const pipelineData = [
  {
    title: "Orders Received",
    value: "4,286",
    valueColor: "text-slate-900",
    // subtitle: "+12% today",
    subtitleColor: "text-green-600",
  },
  {
    title: "Orders Packed",
    value: "3,912",
    valueColor: "text-slate-900",
    // subtitle: "91% completion",
    subtitleColor: "text-green-600",
  },
  {
    title: "Orders Delivered",
    value: "3,764",
    valueColor: "text-green-600",
    // subtitle: "96% success rate",
    subtitleColor: "text-green-600",
  },
  {
    title: "Average Delivery Time",
    value: "34 min",
    valueColor: "text-slate-900",
    // subtitle: "-3 min vs yesterday",
    subtitleColor: "text-blue-600",
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
