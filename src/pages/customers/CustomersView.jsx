import React from 'react'
import Customers_A from './components/Customers_A'
import Customers_B from './components/Customers_B'
import { H1 } from '../../components/basicComponents/Heading'

function CustomersView() {
  return (
    <div>
        <H1 >Customers</H1>
      <Customers_A />
      <Customers_B />
    </div>
  )
}

export default CustomersView
