import { H1 } from "../../components/basicComponents/Heading";
import Dashboard_A from "./components/Dashboard_A";
import Dashboard_B from "./components/Dashboard_B";

export default function DashboardView() {
  return (
   <div className="p-8">
   <H1>Network operations</H1>
   <hr className="mb-6 border-gray-300" />
   <Dashboard_A/>
   <Dashboard_B />
   </div>
  );
}