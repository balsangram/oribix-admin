import React from 'react'
import CommonTable from '../../../components/basicComponents/Table'
import { MapPin, Bell } from 'lucide-react'

export function Dashboard_C() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[3fr_2fr]">
      <div className="min-w-0">
        <NetworkOrder />
      </div>
      <div className="flex min-w-0 flex-col gap-6">
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
  const columns = [
    { key: 'orderId', label: 'Order ID' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'pickup', label: 'Pickup' },
    { key: 'amount', label: 'Amount' },
    { key: 'sla', label: 'SLA' },
    { key: 'status', label: 'Status' },
  ]

  const data = [
    { orderId: 'HSZ-10421', supplier: 'Rajesh Builders', pickup: 'Pune Building Mart', amount: 'Rs 49,200', sla: 'Now', status: 'Out for delivery' },
    { orderId: 'HSZ-10422', supplier: 'Patel Constructions', pickup: 'Capital Steels', amount: 'Rs 1,24,500', sla: '4:20 PM', status: 'Packed' },
    { orderId: 'HSZ-10423', supplier: 'Site-12 Admin', pickup: 'Brick Bazar', amount: 'Rs 88,000', sla: '6:00 PM', status: 'Picking' },
    { orderId: 'HSZ-10424', supplier: 'Shah Group', pickup: 'Civic Works', amount: 'Rs 2,52,300', sla: 'Now', status: 'Accepted' },
    { orderId: 'HSZ-10425', supplier: 'Kapoor Infra', pickup: 'Spark Fabrics', amount: 'Rs 67,200', sla: '10:30 AM', status: 'Delivered' },
  ]

  return (
    <CommonTable
      title="Network orders · Live"
      tabs={[
        { label: 'All', active: true },
        { label: 'New', count: 40 },
        { label: 'In progress', count: 98 },
        { label: 'Dispatched', count: 56 },
      ]}
      columns={columns}
      data={data}
      onViewAll={() => {}}
    />
  )
}

function LiveFleet(){
  const points = [
    { id: 1, top: '15%', left: '18%' },
    { id: 2, top: '35%', left: '42%' },
    { id: 3, top: '56%', left: '66%' },
    { id: 4, top: '28%', left: '78%' },
    { id: 5, top: '64%', left: '24%' },
  ]

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#0b1220]">Live fleet · MMR</h3>
        <button className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-slate-600">Map view</button>
      </div>
      <div className="relative h-[180px] rounded-2xl border border-slate-200 bg-slate-50">
        {points.map((point) => (
          <span
            key={point.id}
            className="absolute inline-flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b1220] text-white shadow"
            style={{ top: point.top, left: point.left }}
          >
            <MapPin className="h-3.5 w-3.5" />
          </span>
        ))}
      </div>
    </div>
  )
}

function LiveAlerts(){
  const alerts = [
    { alert: 'SLA risk · HSZ-10422', region: 'Navi Mumbai', time: '2m ago' },
    { alert: 'Driver off-route · D-1029', region: 'Andheri', time: '5m ago' },
    { alert: 'New vendor KYC', region: 'Thane', time: '12m ago' },
  ]

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#0b1220]">Live alerts</h3>
        <Bell className="h-4 w-4 text-slate-500" />
      </div>
      <div className="space-y-3">
        {alerts.map((item) => (
          <div key={item.alert} className="rounded-xl border border-slate-200 px-3 py-2">
            <p className="text-sm font-medium text-slate-800">{item.alert}</p>
            <p className="mt-1 text-xs text-slate-500">{item.region} · {item.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}