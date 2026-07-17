import React, { useMemo, useState } from "react";
import { AlertTriangle, ChevronDown, Eye, Search } from "lucide-react";
import {
  ORDERS,
  ORDER_STAGES,
  STAGE_DOT,
  VENDOR_OPTIONS,
} from "../data/orderData";
import OrderDetailDrawer from "./OrderDetailDrawer";

function Order_B() {
  const [activeStage, setActiveStage] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openReassign, setOpenReassign] = useState(null);
  const [reassigned, setReassigned] = useState({});

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ORDERS.filter((order) => {
      const matchesStage =
        activeStage === "All" || order.stage === activeStage;
      const matchesSearch =
        !query ||
        [order.id, order.customer, order.vendor, order.gstin, order.zone]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesStage && matchesSearch;
    });
  }, [activeStage, search]);

  const handleReassign = (orderId, vendor) => {
    setReassigned((prev) => ({ ...prev, [orderId]: vendor }));
    setOpenReassign(null);
  };

  return (
    <div className="px-6 pb-6 pt-4">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Search */}
        <div className="border-b border-gray-100 p-4">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order, customer, vendor, GST..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
            />
          </div>

          {/* Stage tabs */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {ORDER_STAGES.map((stage) => (
              <button
                key={stage}
                type="button"
                onClick={() => setActiveStage(stage)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeStage === stage
                    ? "bg-slate-900 text-white"
                    : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Order",
                  "Customer",
                  "Vendor / WH",
                  "Zone",
                  "Amount / Pay",
                  "Stage",
                  "SLA",
                  "Reassign vendor",
                  "",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredOrders.length ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {order.id}
                      </p>
                      <p className="text-xs text-slate-500">{order.time}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-slate-800">
                        {order.customer}
                      </p>
                      <p className="text-xs text-slate-500">{order.items}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-slate-700">
                        {reassigned[order.id] || order.vendor}
                      </p>
                      <p className="text-xs text-slate-500">{order.warehouse}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {order.zone}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800">
                          {order.amount}
                        </span>
                        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                          {order.pay}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            STAGE_DOT[order.stage] || "bg-slate-400"
                          }`}
                        />
                        {order.stage}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {order.sla === "warn" ? (
                        <AlertTriangle size={16} className="text-amber-500" />
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenReassign((prev) =>
                              prev === order.id ? null : order.id
                            )
                          }
                          className="inline-flex w-40 items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                        >
                          <span className="truncate">
                            {reassigned[order.id] || "Reassign …"}
                          </span>
                          <ChevronDown size={14} className="text-slate-400" />
                        </button>

                        {openReassign === order.id && (
                          <div className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 py-1 shadow-xl">
                            {VENDOR_OPTIONS.map((vendor) => (
                              <button
                                key={vendor}
                                type="button"
                                onClick={() => handleReassign(order.id, vendor)}
                                className="block w-full px-3 py-2 text-left text-xs font-medium text-white hover:bg-slate-800"
                              >
                                {vendor}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No orders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-4 py-3 text-sm text-slate-500">
          Showing {filteredOrders.length} of {ORDERS.length} orders
        </div>
      </div>

      <OrderDetailDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

export default Order_B;
