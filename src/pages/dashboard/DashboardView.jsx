import { B_CARD } from "../../components/basicComponents/Card";
import { H1 } from "../../components/basicComponents/Heading";
import Dashboard_A from "./components/Dashboard_A";
import Dashboard_B from "./components/Dashboard_B";
import { Dashboard_C } from "./components/Dashboard_C";

export default function DashboardView() {
  return (
   <B_CARD>
   <H1 className="mb-2 text-xl">Network operations</H1>
   <hr className="mb-4 border-gray-300" />
   <Dashboard_A/>
   <Dashboard_B />
   <Dashboard_C />
   </B_CARD>
  );
}