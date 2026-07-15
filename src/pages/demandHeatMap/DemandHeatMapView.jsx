import React from 'react'
import { H1 } from '../../components/basicComponents/Heading'
import { P } from '../../components/basicComponents/Paragraph'
import OrderPipeLine_A from './components/DemandHeatMap_A'
import OrderPipeLine_B from './components/DemandHeatMap_B'
import { B_CARD } from '../../components/basicComponents/Card'

function DemandHeatMapView() {
  return (
    <B_CARD>
      <H1>Order Pipeline · all hubs</H1>
      <P>Drag orders between stages to manually advance · funnel analytics live.</P>

      <OrderPipeLine_A />
      <OrderPipeLine_B />
    </B_CARD>
  )
}

export default DemandHeatMapView
