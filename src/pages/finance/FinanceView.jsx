import React from 'react'
import Finance_A from './components/Finance_A'
import Finance_B from './components/Finance_B'
import { B_CARD } from '../../components/basicComponents/Card'
import { H1 } from '../../components/basicComponents/Heading'
import { P } from '../../components/basicComponents/Paragraph'

function FinanceView() {
  return (
    <B_CARD>
      <H1 className="mb-1 text-xl">Revenue & Margin</H1>
      <P className="mb-3 text-sm">
        Monitor gross revenue, collections, and outstanding balances.
      </P>
      <Finance_A />
      <Finance_B />
    </B_CARD>
  )
}

export default FinanceView
