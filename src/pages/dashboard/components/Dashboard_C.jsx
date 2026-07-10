import React from 'react'
import CommonTable from '../../../components/basicComponents/Table.js'

export function Dashboard_C() {
  return (
    <div className='flex'>
      <div>
        <NetworkOrder />
      </div>
      <div className='flex flex-col'>
        <div>
            <LiveFleet />
        </div>
        <div>
            <LiveAlerts />
        </div>
      </div>
    </div>
  )
}


function NetworkOrder(){
return (
<>
<CommonTable />
</>
)
}

function LiveFleet(){
    return (
        <>
        </>
    )
}

function LiveAlerts(){
return (
    <>
    <CommonTable />
    </>
)
}