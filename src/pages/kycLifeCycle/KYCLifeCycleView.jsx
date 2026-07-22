import React from 'react'
import { B_CARD } from '../../components/basicComponents/Card'
import { H1 } from '../../components/basicComponents/Heading'
import { P } from '../../components/basicComponents/Paragraph'
import KYCLifeCycle_A from './components/KYCLifeCycle_A'
import KYCLifeCycle_B from './components/KYCLifeCycle_B'

function KYCLifeCycleView() {
  return (
    <B_CARD>
      <H1 className="mb-1 text-xl">KYC Lifecycle</H1>
      <P className="mb-3 text-sm">
        Review vendor applications, verification status, and approval turnaround.
      </P>
      <KYCLifeCycle_A />
      <KYCLifeCycle_B />
    </B_CARD>
  )
}

export default KYCLifeCycleView
