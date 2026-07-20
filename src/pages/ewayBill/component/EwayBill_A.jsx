import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';
const ewaySummary = [
  {
    title: "Total E-Way Bills",
    value: "1,286",
    valueColor: "text-slate-900",
    // subtitle: "+38 generated today",
    subtitleColor: "text-green-600",
  },
  {
    title: "Pending Review",
    value: "42",
    valueColor: "text-amber-600",
    // subtitle: "Awaiting verification",
    subtitleColor: "text-amber-600",
  },
  {
    title: "Verified",
    value: "1,208",
    valueColor: "text-green-600",
    // subtitle: "94% compliance",
    subtitleColor: "text-green-600",
  },
  {
    title: "Expiring Today",
    value: "36",
    valueColor: "text-orange-600",
    // subtitle: "Requires action",
    subtitleColor: "text-orange-600",
  },
];
function EwayBill_A() {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-6 ">
                  {ewaySummary.map((item, index) => (
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

export default EwayBill_A
