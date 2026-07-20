import React from "react";
import { VS_CARD } from "../../../components/basicComponents/Card";

const financeSummary = [
    {
      title: "Gross Revenue",
      value: "₹18.72Cr",
      valueColor: "text-green-600",
    //   subtitle: "+12.4% vs last month",
      subtitleColor: "text-green-600",
    },
    {
      title: "Net Profit",
      value: "₹2.84Cr",
      valueColor: "text-blue-600",
    //   subtitle: "15.2% margin",
      subtitleColor: "text-blue-600",
    },
    {
      title: "Collections",
      value: "₹16.95Cr",
      valueColor: "text-purple-600",
    //   subtitle: "90.5% collected",
      subtitleColor: "text-purple-600",
    },
    {
      title: "Outstanding",
      value: "₹1.77Cr",
      valueColor: "text-orange-600",
    //   subtitle: "Pending payments",
      subtitleColor: "text-orange-600",
    },
  ];

function Finance_A() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-6 ">
                         {financeSummary.map((item, index) => (
                       <VS_CARD
                     key={index}
                     className="flex flex-col justify-center"
                   >
                     <p className="text-xs text-gray-500 font-medium">
                       {item.title}
                     </p>
                   
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

export default Finance_A;
