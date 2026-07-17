import React from "react";
import { VS_CARD } from "../../../components/basicComponents/Card";
import { ORDER_STATS } from "../data/orderData";

function Order_A() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 px-6 pt-6">
      {ORDER_STATS.map((item, index) => (
        <VS_CARD key={index} className="flex flex-col justify-center">
          <p className="text-xs text-gray-500 font-medium">{item.title}</p>

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
  );
}

export default Order_A;
