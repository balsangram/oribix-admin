import {
  ShoppingBag,
  IndianRupee,
  AlertTriangle,
  Store,
  PackageCheck,
} from "lucide-react";

import { D_CARD } from "../../../components/basicComponents/Card";

const dashboardCards = [
  {
    title: "Live Orders",
    value: "284",
    icon: <ShoppingBag size={16} />,
  },
  {
    title: "GMV Today",
    value: "₹45,230",
    icon: <IndianRupee size={16} />,
  },
  {
    title: "SLA Risk",
    value: "12",
    icon: <AlertTriangle size={16} />,
  },
  {
    title: "Vendors Online",
    value: "152",
    icon: <Store size={16} />,
  },
  {
    title: "Avg Delivery",
    value: "24 min",
    icon: <PackageCheck size={16} />,
  },
];

export default function Dashboard_A() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {dashboardCards.map((card) => (
        <D_CARD key={card.title} {...card} className="h-full w-full" />
      ))}
    </div>
  );
}