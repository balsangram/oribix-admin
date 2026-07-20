import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card'
const returnsSummary = [
  {
    title: "Open Disputes",
    value: "46",
    valueColor: "text-red-600",
    // subtitle: "12 high priority",
    subtitleColor: "text-red-600",
  },
  {
    title: "Resolved Today",
    value: "18",
    valueColor: "text-green-600",
    // subtitle: "92% SLA compliance",
    subtitleColor: "text-green-600",
  },
  {
    title: "Refund Amount",
    value: "₹8.74L",
    valueColor: "text-blue-600",
    // subtitle: "Approved refunds",
    subtitleColor: "text-blue-600",
  },
  {
    title: "Avg Resolution Time",
    value: "19h",
    valueColor: "text-slate-900",
    // subtitle: "Claim → Closed",
    subtitleColor: "text-slate-500",
  },
];
function Returns_A() {
  return (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-6 ">
                      {returnsSummary.map((item, index) => (
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

export default Returns_A
