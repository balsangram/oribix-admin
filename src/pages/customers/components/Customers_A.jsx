import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';
const customerSummary = [
  {
    title: "Total Customers",
    value: "18,742",
    valueColor: "text-slate-900",
    // subtitle: "+246 this month",
    subtitleColor: "text-green-600",
  },
  {
    title: "Active Customers",
    value: "15,386",
    valueColor: "text-green-600",
    // subtitle: "82% active rate",
    subtitleColor: "text-green-600",
  },
  {
    title: "Verified Accounts",
    value: "17,924",
    valueColor: "text-blue-600",
    // subtitle: "95.6% verified",
    subtitleColor: "text-blue-600",
  },
  {
    title: "New Registrations",
    value: "184",
    valueColor: "text-orange-600",
    // subtitle: "Today",
    subtitleColor: "text-orange-600",
  },
];
function Customers_A() {
  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-6 ">
                      {customerSummary.map((item, index) => (
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

export default Customers_A
