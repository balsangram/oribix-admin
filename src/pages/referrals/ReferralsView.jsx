import React from 'react'
import Referrals_A from './components/Referrals_A'
import Referrals_B from './components/Referrals_B'
import { B_CARD } from '../../components/basicComponents/Card'
import { H1 } from '../../components/basicComponents/Heading'
import { P } from '../../components/basicComponents/Paragraph'

function ReferralsView() {
  return (
    <B_CARD>
      <H1 className="mb-1 text-xl">Promos & Referrals</H1>
      <P className="mb-3 text-sm">
        Track campaigns, coupon redemptions, and referral performance.
      </P>
      <Referrals_A />
      <Referrals_B />
    </B_CARD>
  )
}

export default ReferralsView
