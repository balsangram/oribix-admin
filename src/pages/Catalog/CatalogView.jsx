import React from 'react'
import { B_CARD } from '../../components/basicComponents/Card'
import { H1 } from '../../components/basicComponents/Heading'
import { P } from '../../components/basicComponents/Paragraph'
import Catalog_A from './componets/Catalog_A'
import Catalog_B from './componets/Catalog_B'

function CatalogView() {
  return (
    <B_CARD>
      <H1 className="mb-1 text-xl">Catalog</H1>
      <P className="mb-3 text-sm">
        Manage products, brands, categories, and compliance details.
      </P>
      <Catalog_A />
      <Catalog_B />
    </B_CARD>
  )
}

export default CatalogView
