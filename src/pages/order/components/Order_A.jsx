import React from "react";
import { VS_CARD } from "../../../components/basicComponents/Card";
const orderSummary = [
  {
    title: "Today's Orders",
    value: "1,224",
    valueColor: "text-slate-900",
    // subtitle: "₹1.82 Cr GMV",
    subtitleColor: "text-slate-500",
  },
  {
    title: "In Fulfillment",
    value: "284",
    valueColor: "text-blue-600",
    // subtitle: "Picking • Packing • Dispatch",
    subtitleColor: "text-blue-600",
  },
  {
    title: "Delivered Today",
    value: "918",
    valueColor: "text-green-600",
    // subtitle: "75% completion rate",
    subtitleColor: "text-green-600",
  },
  {
    title: "SLA Breached",
    value: "14",
    valueColor: "text-red-600",
    // subtitle: "Needs immediate attention",
    subtitleColor: "text-red-600",
  },
];
function Order_A() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 px-6 pt-6">
      {orderSummary.map((item, index) => (
        <VS_CARD key={index} className="flex flex-col justify-center">
          <p className="text-xs text-gray-500 font-medium">{item.title}</p>

          <h2 className={`text-3xl font-bold mt-1 ${item.valueColor}`}>
            {item.value}
          </h2>

          {item.subtitle && (
            <p className={`text-xs mt-1 ${item.subtitleColor}`}>
              {item.subtitle}
            </p>
          )}
        </VS_CARD>
      ))}
    </div>
  );
}

export default Order_A;
