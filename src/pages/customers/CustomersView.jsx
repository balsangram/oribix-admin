import React from 'react'
import Customers_A from './components/Customers_A'
import Customers_B from './components/Customers_B'
import { H1 } from '../../components/basicComponents/Heading'
import { B_CARD } from '../../components/basicComponents/Card'

function CustomersView() {
  return (
    <B_CARD>
        <H1>Customers</H1>
      <Customers_A />
      <Customers_B />
      </B_CARD>
  )
}

export default CustomersView
