import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';
const vendorSummary = [
  {
    title: "Total Vendors",
    value: "248",
    valueColor: "text-slate-900",
    // subtitle: "+18 this month",
    subtitleColor: "text-green-600",
  },
  {
    title: "Verified Vendors",
    value: "182",
    valueColor: "text-green-600",
    // subtitle: "73% verification rate",
    subtitleColor: "text-green-600",
  },
  {
    title: "Pending Verification",
    value: "51",
    valueColor: "text-amber-600",
    // subtitle: "Awaiting KYC review",
    subtitleColor: "text-amber-600",
  },
  {
    title: "Active Warehouses",
    value: "96",
    valueColor: "text-slate-900",
    // subtitle: "Across 28 cities",
    subtitleColor: "text-slate-500",
  },
];
function Vendors_A() {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-6 ">
        {vendorSummary.map((item, index) => (
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

export default Vendors_A
