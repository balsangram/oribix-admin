import React from 'react'
import Customers_A from './components/Customers_A'
import Customers_B from './components/Customers_B'
import { H1 } from '../../components/basicComponents/Heading'
import { P } from '../../components/basicComponents/Paragraph'
import { B_CARD } from '../../components/basicComponents/Card'

function CustomersView() {
  return (
    <B_CARD>
      <H1 className="mb-1 text-xl">Customers</H1>
      <P className="mb-3 text-sm">
        Browse registered buyers, verification status, and account activity.
      </P>
      <Customers_A />
      <Customers_B />
    </B_CARD>
  )
}

export default CustomersView
