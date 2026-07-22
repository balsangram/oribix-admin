import React from 'react'
import Support_A from './components/Support_A'
import Support_B from './components/Support_B'
import { B_CARD } from '../../components/basicComponents/Card'
import { H1 } from '../../components/basicComponents/Heading'
import { P } from '../../components/basicComponents/Paragraph'

function SupportView() {
  return (
    <B_CARD>
      <H1 className="mb-1 text-xl">Support Tickets</H1>
      <P className="mb-3 text-sm">
        Triage open tickets, SLA breaches, and first-response performance.
      </P>
      <Support_A />
      <Support_B />
    </B_CARD>
  )
}

export default SupportView
