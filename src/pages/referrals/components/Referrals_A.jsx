import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';

const promoSummary = [
  {
    title: "Active Campaigns",
    value: "18",
    valueColor: "text-blue-600",
    subtitleColor: "text-blue-600",
  },
  {
    title: "Coupons Redeemed",
    value: "1,842",
    valueColor: "text-green-600",
    subtitleColor: "text-green-600",
  },
  {
    title: "Successful Referrals",
    value: "426",
    valueColor: "text-purple-600",
    subtitleColor: "text-purple-600",
  },
  {
    title: "Discount Given",
    value: "₹12.6L",
    valueColor: "text-orange-600",
    subtitleColor: "text-orange-600",
  },
];

function Referrals_A() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {promoSummary.map((item, index) => (
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

export default Referrals_A
