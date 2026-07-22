import React from 'react'
import { B_CARD } from '../../components/basicComponents/Card'
import { H1 } from '../../components/basicComponents/Heading'
import { P } from '../../components/basicComponents/Paragraph'
import EwayBill_A from './component/EwayBill_A'
import EwayBill_B from './component/EwayBill_B'

function EwayBillView() {
  return (
    <B_CARD>
      <H1 className="mb-1 text-xl">E-Way Bill Review</H1>
      <P className="mb-3 text-sm">
        Verify Part A/B, validity windows, and risk before dispatch.
      </P>
      <EwayBill_A />
      <EwayBill_B />
    </B_CARD>
  )
}

export default EwayBillView
