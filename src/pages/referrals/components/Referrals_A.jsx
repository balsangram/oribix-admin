import React from 'react'
import { VS_CARD } from '../../../components/basicComponents/Card';

const promoSummary = [
  {
    title: "Active Campaigns",
    value: "18",
    valueColor: "text-blue-600",
    // subtitle: "5 ending this week",
    subtitleColor: "text-blue-600",
  },
  {
    title: "Coupons Redeemed",
    value: "1,842",
    valueColor: "text-green-600",
    // subtitle: "74% redemption rate",
    subtitleColor: "text-green-600",
  },
  {
    title: "Successful Referrals",
    value: "426",
    valueColor: "text-purple-600",
    // subtitle: "+38 this month",
    subtitleColor: "text-purple-600",
  },
  {
    title: "Discount Given",
    value: "₹12.6L",
    valueColor: "text-orange-600",
    // subtitle: "This month",
    subtitleColor: "text-orange-600",
  },
];
function Referrals_A() {
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-6 ">
                         {promoSummary.map((item, index) => (
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

export default Referrals_A
