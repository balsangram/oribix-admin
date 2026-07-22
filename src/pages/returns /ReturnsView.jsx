import React from 'react'
import Returns_A from './components/Returns_A'
import Returns_B from './components/Returns_B'
import { B_CARD } from '../../components/basicComponents/Card'
import { H1 } from '../../components/basicComponents/Heading'
import { P } from '../../components/basicComponents/Paragraph'

function ReturnsView() {
  return (
    <B_CARD>
      <H1 className="mb-1 text-xl">Returns & Disputes</H1>
      <P className="mb-3 text-sm">
        Resolve claims, refunds, and SLA escalations across the network.
      </P>
      <Returns_A />
      <Returns_B />
    </B_CARD>
  )
}

export default ReturnsView
