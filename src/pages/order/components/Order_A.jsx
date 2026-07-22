import React from "react";
import { VS_CARD } from "../../../components/basicComponents/Card";

const orderSummary = [
  {
    title: "Today's Orders",
    value: "1,224",
    valueColor: "text-slate-900",
    subtitleColor: "text-slate-500",
  },
  {
    title: "In Fulfillment",
    value: "284",
    valueColor: "text-blue-600",
    subtitleColor: "text-blue-600",
  },
  {
    title: "Delivered Today",
    value: "918",
    valueColor: "text-green-600",
    subtitleColor: "text-green-600",
  },
  {
    title: "SLA Breached",
    value: "14",
    valueColor: "text-red-600",
    subtitleColor: "text-red-600",
  },
];

function Order_A() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {orderSummary.map((item, index) => (
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

export default Order_A;
