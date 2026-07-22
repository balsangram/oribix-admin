import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';

const vendorSummary = [
  {
    title: "Total Vendors",
    value: "248",
    valueColor: "text-slate-900",
    subtitleColor: "text-green-600",
  },
  {
    title: "Verified Vendors",
    value: "182",
    valueColor: "text-green-600",
    subtitleColor: "text-green-600",
  },
  {
    title: "Pending Verification",
    value: "51",
    valueColor: "text-amber-600",
    subtitleColor: "text-amber-600",
  },
  {
    title: "Active Warehouses",
    value: "96",
    valueColor: "text-slate-900",
    subtitleColor: "text-slate-500",
  },
];

function Vendors_A() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {vendorSummary.map((item, index) => (
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

export default Vendors_A
