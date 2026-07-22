import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';

const ewaySummary = [
  {
    title: "Total E-Way Bills",
    value: "1,286",
    valueColor: "text-slate-900",
    subtitleColor: "text-green-600",
  },
  {
    title: "Pending Review",
    value: "42",
    valueColor: "text-amber-600",
    subtitleColor: "text-amber-600",
  },
  {
    title: "Verified",
    value: "1,208",
    valueColor: "text-green-600",
    subtitleColor: "text-green-600",
  },
  {
    title: "Expiring Today",
    value: "36",
    valueColor: "text-orange-600",
    subtitleColor: "text-orange-600",
  },
];

function Catalog_A() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {ewaySummary.map((item, index) => (
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

export default Catalog_A
