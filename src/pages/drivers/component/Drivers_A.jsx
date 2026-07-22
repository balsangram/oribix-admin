import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';

const fleetSummary = [
  {
    title: "Total Drivers",
    value: "248",
    valueColor: "text-slate-900",
    subtitleColor: "text-slate-500",
  },
  {
    title: "On Delivery",
    value: "186",
    valueColor: "text-blue-600",
    subtitleColor: "text-blue-600",
  },
  {
    title: "Available",
    value: "42",
    valueColor: "text-green-600",
    subtitleColor: "text-green-600",
  },
  {
    title: "Avg Driver Rating",
    value: "4.8★",
    valueColor: "text-yellow-500",
    subtitleColor: "text-slate-500",
  },
];

function Drivers_A() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {fleetSummary.map((item, index) => (
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
  )
}

export default Drivers_A
