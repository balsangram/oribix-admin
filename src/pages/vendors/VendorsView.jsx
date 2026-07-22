import React from 'react'
import Vendors_A from './components/Vendors_A'
import Vendors_B from './components/Vendors_B'
import { B_CARD } from '../../components/basicComponents/Card'
import { H1 } from '../../components/basicComponents/Heading'
import { P } from '../../components/basicComponents/Paragraph'

function VendorsView() {
  return (
    <B_CARD>
      <H1 className="text-xl">Warehouses & Vendors</H1>
      <P className="text-sm">
        Manage vendor accounts, verification status, and warehouse coverage.
      </P>
      <Vendors_A />
      <Vendors_B />
    </B_CARD>
  )
}

export default VendorsView
