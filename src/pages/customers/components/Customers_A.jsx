import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';

const customerSummary = [
  {
    title: "Total Customers",
    value: "18,742",
    valueColor: "text-slate-900",
    subtitleColor: "text-green-600",
  },
  {
    title: "Active Customers",
    value: "15,386",
    valueColor: "text-green-600",
    subtitleColor: "text-green-600",
  },
  {
    title: "Verified Accounts",
    value: "17,924",
    valueColor: "text-blue-600",
    subtitleColor: "text-blue-600",
  },
  {
    title: "New Registrations",
    value: "184",
    valueColor: "text-orange-600",
    subtitleColor: "text-orange-600",
  },
];

function Customers_A() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {customerSummary.map((item, index) => (
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

export default Customers_A
