import React from "react";
import { VS_CARD } from "../../../components/basicComponents/Card";

const financeSummary = [
  {
    title: "Gross Revenue",
    value: "₹18.72Cr",
    valueColor: "text-green-600",
    subtitleColor: "text-green-600",
  },
  {
    title: "Net Profit",
    value: "₹2.84Cr",
    valueColor: "text-blue-600",
    subtitleColor: "text-blue-600",
  },
  {
    title: "Collections",
    value: "₹16.95Cr",
    valueColor: "text-purple-600",
    subtitleColor: "text-purple-600",
  },
  {
    title: "Outstanding",
    value: "₹1.77Cr",
    valueColor: "text-orange-600",
    subtitleColor: "text-orange-600",
  },
];

function Finance_A() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {financeSummary.map((item, index) => (
        <VS_CARD key={index} className="flex flex-col justify-center gap-1">
          <p className="text-[11px] font-medium tracking-wide text-gray-500">
            {item.title}
          </p>
          <h2 className={`text-2xl font-bold leading-none tracking-tight ${item.valueColor}`}>
            {item.value}
          </h2>
          {item.subtitle ? (
            <p className={`text-[11px] ${item.subtitleColor}`}>{item.subtitle}</p>
          ) : null}
        </VS_CARD>
      ))}
    </div>
  );
}

export default Finance_A;
