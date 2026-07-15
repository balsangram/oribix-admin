import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';
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
function KYCLifeCycle_A() {
  return (
       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-6 ">
         {pipelineData.map((item, index) => (
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
  )
}

export default KYCLifeCycle_A
