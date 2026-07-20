import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';
const kycSummary = [
  {
    title: "Total Applications",
    value: "324",
    valueColor: "text-slate-900",
    // subtitle: "+22 this week",
    subtitleColor: "text-green-600",
  },
  {
    title: "Pending Verification",
    value: "48",
    valueColor: "text-amber-600",
    // subtitle: "15% of applications",
    subtitleColor: "text-amber-600",
  },
  {
    title: "Approved",
    value: "258",
    valueColor: "text-green-600",
    // subtitle: "79.6% approval rate",
    subtitleColor: "text-green-600",
  },
  {
    title: "Average Review Time",
    value: "18h",
    valueColor: "text-slate-900",
    // subtitle: "Application → Decision",
    subtitleColor: "text-slate-500",
  },
];
function KYCLifeCycle_A() {
  return (
       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-6 ">
         {kycSummary.map((item, index) => (
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
