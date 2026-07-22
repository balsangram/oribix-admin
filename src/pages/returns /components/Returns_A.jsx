import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card'

const returnsSummary = [
  {
    title: "Open Disputes",
    value: "46",
    valueColor: "text-red-600",
    subtitleColor: "text-red-600",
  },
  {
    title: "Resolved Today",
    value: "18",
    valueColor: "text-green-600",
    subtitleColor: "text-green-600",
  },
  {
    title: "Refund Amount",
    value: "₹8.74L",
    valueColor: "text-blue-600",
    subtitleColor: "text-blue-600",
  },
  {
    title: "Avg Resolution Time",
    value: "19h",
    valueColor: "text-slate-900",
    subtitleColor: "text-slate-500",
  },
];

function Returns_A() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {returnsSummary.map((item, index) => (
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

export default Returns_A
