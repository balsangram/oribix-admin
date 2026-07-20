import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';
const supportSummary = [
  {
    title: "Open Tickets",
    value: "128",
    valueColor: "text-slate-900",
    // subtitle: "34 new today",
    subtitleColor: "text-green-600",
  },
  {
    title: "Avg First Response",
    value: "9 min",
    valueColor: "text-blue-600",
    // subtitle: "Target < 15 min",
    subtitleColor: "text-blue-600",
  },
  {
    title: "Resolved Today",
    value: "86",
    valueColor: "text-green-600",
    // subtitle: "91% SLA achieved",
    subtitleColor: "text-green-600",
  },
  {
    title: "Critical (P1)",
    value: "12",
    valueColor: "text-red-600",
    // subtitle: "Requires immediate attention",
    subtitleColor: "text-red-600",
  },
];
function Support_A() {
  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-6 ">
                      {supportSummary.map((item, index) => (
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

export default Support_A
