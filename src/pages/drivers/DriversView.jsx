import React from 'react'
import Drivers_A from './component/Drivers_A'
import Drivers_B from './component/Drivers_B'
import { B_CARD } from '../../components/basicComponents/Card'
import { H1 } from '../../components/basicComponents/Heading'
import { P } from '../../components/basicComponents/Paragraph'

function DriversView() {
  return (
    <B_CARD>
      <H1 className="mb-1 text-xl">Drivers & Fleet</H1>
      <P className="mb-3 text-sm">
        Track driver availability, ratings, and live delivery utilization.
      </P>
      <Drivers_A />
      <Drivers_B />
    </B_CARD>
  )
}

export default DriversView
