import React from "react";
import { B_CARD } from "../../components/basicComponents/Card";
import { H1 } from "../../components/basicComponents/Heading";
import { P } from "../../components/basicComponents/Paragraph";
import Order_A from "./components/Order_A";
import Order_B from "./components/Order_B";

function OrderView() {
  return (
    <B_CARD>
      <H1 className="mb-1 text-xl">Orders</H1>
      <P className="mb-3 text-sm">
        Gross marketplace order ledger · 1,224 orders today · 18 exceptions
      </P>
      <Order_A />
      <Order_B />
    </B_CARD>
  );
}

export default OrderView;
