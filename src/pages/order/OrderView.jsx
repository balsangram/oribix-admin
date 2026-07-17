import React from "react";
import Order_A from "./components/Order_A";
import Order_B from "./components/Order_B";

function OrderView() {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-sm text-slate-500">
          Gross marketplace order ledger · 1,224 orders today · 18 exceptions
        </p>
      </div>

      <Order_A />
      <Order_B />
    </div>
  );
}

export default OrderView;
