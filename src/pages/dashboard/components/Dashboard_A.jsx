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
    
    icon: <ShoppingBag size={20} />,
  },
  {
    title: "GMV Today",
    value: "₹45,230",
  
    icon: <IndianRupee size={20} />,
  },
  {
    title: "SLA Risk",
    value: "12",
  
    icon: <AlertTriangle size={20} />,
  },
  {
    title: "Vendors Online",
    value: "152",
   
    icon: <Store size={20} />,
  },
  {
    title: "Avg Delivery",
    value: "24 min",
   
    icon: <PackageCheck size={20} />,
  },
];

export default function Dashboard_A() {
  return (
    <div className="flex justify-between gap-5">
      {dashboardCards.map((card) => (
        <D_CARD key={card.title} {...card} />
      ))}
    </div>
  );
}