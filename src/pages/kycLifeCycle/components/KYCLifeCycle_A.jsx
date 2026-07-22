import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';

const kycSummary = [
  {
    title: "Total Applications",
    value: "324",
    valueColor: "text-slate-900",
    subtitleColor: "text-green-600",
  },
  {
    title: "Pending Verification",
    value: "48",
    valueColor: "text-amber-600",
    subtitleColor: "text-amber-600",
  },
  {
    title: "Approved",
    value: "258",
    valueColor: "text-green-600",
    subtitleColor: "text-green-600",
  },
  {
    title: "Average Review Time",
    value: "18h",
    valueColor: "text-slate-900",
    subtitleColor: "text-slate-500",
  },
];

function KYCLifeCycle_A() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kycSummary.map((item, index) => (
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

export default KYCLifeCycle_A
