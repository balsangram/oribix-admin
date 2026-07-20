import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';
const fleetSummary = [
  {
    title: "Total Drivers",
    value: "248",
    valueColor: "text-slate-900",
    // subtitle: "Across 18 hubs",
    subtitleColor: "text-slate-500",
  },
  {
    title: "On Delivery",
    value: "186",
    valueColor: "text-blue-600",
    // subtitle: "75% fleet utilization",
    subtitleColor: "text-blue-600",
  },
  {
    title: "Available",
    value: "42",
    valueColor: "text-green-600",
    // subtitle: "Ready for dispatch",
    subtitleColor: "text-green-600",
  },
  {
    title: "Avg Driver Rating",
    value: "4.8★",
    valueColor: "text-yellow-500",
    // subtitle: "Based on 12,840 deliveries",
    subtitleColor: "text-slate-500",
  },
];
function Drivers_A() {
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-6 ">
                    {fleetSummary.map((item, index) => (
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

export default Drivers_A
