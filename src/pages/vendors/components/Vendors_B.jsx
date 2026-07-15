import React, { useState } from "react";
import { S_CARD } from "../../../components/basicComponents/Card";
import { SEARCH_BAR } from "../../../components/basicComponents/Search";
import {
  VendorCardHeader,
  VendorCardMetrics,
  VendorCardGmv,
  VendorCardActions,
  VendorCardApprovalActions,
} from "./VendorCardParts";

const vendors = [
  {
    id: 1,
    name: "Anil Sharma",
    city: "Mumbai",
    warehouses: 2,
    status: "Verified",
    accentColor: "#22C55E",
    avatar: "https://i.pravatar.cc/96?img=12",
    rating: "4.7",
    fulfillment: 96,
    orders: 412,
    gmv: "₹2.4L",
    mode: "standard",
  },
  {
    id: 2,
    name: "Ravi Mehta",
    city: "Pune",
    warehouses: 1,
    status: "Pending",
    accentColor: "#F59E0B",
    avatar: "https://i.pravatar.cc/96?img=33",
    rating: "—",
    fulfillment: 0,
    orders: 0,
    gmv: "₹0",
    mode: "approval",
  },
  {
    id: 3,
    name: "Priya Nair",
    city: "Bangalore",
    warehouses: 1,
    status: "Verified",
    accentColor: "#3B82F6",
    avatar: "https://i.pravatar.cc/96?img=5",
    rating: "4.9",
    fulfillment: 98,
    orders: 287,
    gmv: "₹1.8L",
    mode: "standard",
  },
  {
    id: 4,
    name: "Suresh Patil",
    city: "Nashik",
    warehouses: 3,
    status: "Resubmit",
    accentColor: "#F07167",
    avatar: "https://i.pravatar.cc/96?img=52",
    rating: "3.2",
    fulfillment: 71,
    orders: 98,
    gmv: "₹64K",
    mode: "standard",
  },
  {
    id: 5,
    name: "Neha Gupta",
    city: "Delhi",
    warehouses: 2,
    status: "Verified",
    accentColor: "#22C55E",
    avatar: "https://i.pravatar.cc/96?img=9",
    rating: "4.5",
    fulfillment: 94,
    orders: 356,
    gmv: "₹2.1L",
    mode: "standard",
  },
  {
    id: 6,
    name: "Arjun Reddy",
    city: "Hyderabad",
    warehouses: 1,
    status: "Verified",
    accentColor: "#3B82F6",
    avatar: "https://i.pravatar.cc/96?img=15",
    rating: "4.6",
    fulfillment: 92,
    orders: 221,
    gmv: "₹1.5L",
    mode: "standard",
  },
];

function VendorCard({ vendor }) {
  return (
    <S_CARD accentColor={vendor.accentColor}>
      <VendorCardHeader
        avatar={vendor.avatar}
        name={vendor.name}
        city={vendor.city}
        warehouses={vendor.warehouses}
        status={vendor.status}
      />

      <VendorCardMetrics
        rating={vendor.rating}
        fulfillment={vendor.fulfillment}
        orders={vendor.orders}
      />

      <VendorCardGmv
        gmv={vendor.gmv}
        showContacts={vendor.mode === "standard"}
      />

      {vendor.mode === "approval" ? (
        <VendorCardApprovalActions />
      ) : (
        <VendorCardActions />
      )}
    </S_CARD>
  );
}

function Vendors_B() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredVendors = vendors.filter((vendor) => {
    const matchesFilter =
      filter === "All" ||
      vendor.status === filter ||
      (filter === "Suspended" && vendor.status === "Suspended");

    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      vendor.name.toLowerCase().includes(q) ||
      vendor.city.toLowerCase().includes(q);

    return matchesFilter && matchesQuery;
  });

  return (
    <div className="px-6 pb-6 flex flex-col gap-5">
      <SEARCH_BAR
        value={query}
        onSearch={setQuery}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}

export default Vendors_B
