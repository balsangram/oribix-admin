import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommonTable from '../../../components/basicComponents/Table'
import { ChevronDown, Maximize2, Minus, Plus, Search } from 'lucide-react'

export function Dashboard_C() {
  return (
    <div className="mt-4 grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[3fr_2fr]">
      <div className="min-w-0">
        <NetworkOrder />
      </div>
      <div className="flex min-w-0 min-h-0">
        <LiveFleet />
      </div>
    </div>
  )
}


function NetworkOrder(){
  const [activeTab, setActiveTab] = useState('All')
  const [page, setPage] = useState(1)

  const columns = [
    { key: 'orderId', label: 'Order ID' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'pickup', label: 'Pickup' },
    { key: 'amount', label: 'Amount' },
    { key: 'sla', label: 'SLA' },
    { key: 'status', label: 'Status', type: 'status' },
  ]

  const data = [
    { orderId: 'HSZ-10421', supplier: 'Rajesh Builders', pickup: 'Pune Building Mart', amount: 'Rs 49,200', sla: 'Now', status: 'Out for delivery' },
    { orderId: 'HSZ-10422', supplier: 'Patel Constructions', pickup: 'Capital Steels', amount: 'Rs 1,24,500', sla: '4:20 PM', status: 'Packed' },
    { orderId: 'HSZ-10423', supplier: 'Site-12 Admin', pickup: 'Brick Bazar', amount: 'Rs 88,000', sla: '6:00 PM', status: 'Picking' },
    { orderId: 'HSZ-10424', supplier: 'Shah Group', pickup: 'Civic Works', amount: 'Rs 2,52,300', sla: 'Now', status: 'Accepted' },
    { orderId: 'HSZ-10425', supplier: 'Kapoor Infra', pickup: 'Spark Fabrics', amount: 'Rs 67,200', sla: '10:30 AM', status: 'Delivered' },
  ]

  const filtered = useMemo(() => {
    if (activeTab === 'All') return data
    if (activeTab === 'New') return data.filter((r) => r.status === 'Accepted')
    if (activeTab === 'In progress') {
      return data.filter((r) =>
        ['Out for delivery', 'Packed', 'Picking'].includes(r.status)
      )
    }
    if (activeTab === 'Dispatched') {
      return data.filter((r) =>
        ['Out for delivery', 'Delivered'].includes(r.status)
      )
    }
    return data
  }, [activeTab])

  return (
    <CommonTable
      title="Network orders · Live"
      tabs={[
        { label: 'All', active: activeTab === 'All' },
        { label: 'New', count: 40, active: activeTab === 'New' },
        { label: 'In progress', count: 98, active: activeTab === 'In progress' },
        { label: 'Dispatched', count: 56, active: activeTab === 'Dispatched' },
      ]}
      onTabChange={(tab) => {
        setActiveTab(tab.label)
        setPage(1)
      }}
      columns={columns}
      data={filtered}
      onViewAll={() => {}}
      pagination={{
        page,
        pageSize: 5,
        total: 240,
        totalPages: 12,
        onPageChange: setPage,
      }}
    />
  )
}

const FLEET_SHIPMENTS = [
  { id: '#HZ10421', detail: 'Cement bags 48kg', x: 24, y: 36, area: 'Andheri', eta: '12m' },
  { id: '#HZ10422', detail: 'Steel rods 120kg', x: 46, y: 44, area: 'BKC', eta: '9m' },
  { id: '#HZ10423', detail: 'Bricks pallet 85kg', x: 64, y: 60, area: 'Thane', eta: '21m' },
  { id: '#HZ10424', detail: 'Tiles crate 36kg', x: 76, y: 28, area: 'Navi Mumbai', eta: '18m' },
  { id: '#HZ10425', detail: 'Pipes bundle 64kg', x: 34, y: 72, area: 'Worli', eta: '7m' },
  { id: '#HZ10426', detail: 'Sand bags 90kg', x: 56, y: 20, area: 'Powai', eta: '15m' },
]

const SORT_OPTIONS = ['In Transit', 'Delivered', 'Delayed', 'All']

const AREA_LABELS = [
  { label: 'ANDHERI', x: '20%', y: '26%' },
  { label: 'POWAI', x: '56%', y: '12%' },
  { label: 'BKC', x: '44%', y: '52%' },
  { label: 'THANE', x: '70%', y: '68%' },
  { label: 'WORLI', x: '28%', y: '82%' },
  { label: 'NAVI MUMBAI', x: '80%', y: '38%' },
]

function PackageIcon({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 8.5 12 4l8.5 4.5v9L12 22l-8.5-4.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 12v10M3.5 8.5 12 12l8.5-3.5M8 6.2l8 4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LiveFleet() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('Mumbai MMR, India')
  const [sortBy, setSortBy] = useState('In Transit')
  const [sortOpen, setSortOpen] = useState(false)
  const [activeId, setActiveId] = useState(FLEET_SHIPMENTS[1].id)
  const [zoom, setZoom] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q || q.includes('mumbai') || q.includes('mmr') || q.includes('india')) {
      return FLEET_SHIPMENTS
    }
    return FLEET_SHIPMENTS.filter(
      (s) =>
        s.id.toLowerCase().includes(q) ||
        s.detail.toLowerCase().includes(q) ||
        s.area.toLowerCase().includes(q)
    )
  }, [query])

  const active = filtered.find((s) => s.id === activeId) || filtered[0]

  return (
    <div className="relative flex h-full w-full min-h-[360px] flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-[#F3F0E8] shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
      {/* Map surface */}
      <div
        className="absolute inset-0 origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `scale(${zoom})` }}
      >
        {/* Base + zones */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 42% 32% at 16% 74%, rgba(180,210,176,0.55) 0%, transparent 68%),
              radial-gradient(ellipse 36% 28% at 82% 16%, rgba(186,216,182,0.5) 0%, transparent 65%),
              radial-gradient(ellipse 48% 26% at 58% 90%, rgba(170,200,220,0.45) 0%, transparent 70%),
              radial-gradient(ellipse 28% 22% at 6% 28%, rgba(168,198,222,0.4) 0%, transparent 62%),
              radial-gradient(ellipse 24% 18% at 42% 40%, rgba(220,214,198,0.35) 0%, transparent 70%),
              linear-gradient(155deg, #F8F5EE 0%, #F2EFE6 42%, #EBE7DD 100%)
            `,
          }}
        />

        {/* Soft grid */}
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.16) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.16) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
          }}
        />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Arterial roads */}
          <path d="M-2 40 H102" stroke="#D6D0C4" strokeWidth="1.1" />
          <path d="M-2 40 H102" stroke="#F7F4ED" strokeWidth="0.45" />
          <path d="M38 -2 V102" stroke="#D6D0C4" strokeWidth="1.1" />
          <path d="M38 -2 V102" stroke="#F7F4ED" strokeWidth="0.45" />

          <path d="M-2 22 H102" stroke="#E0DBD1" strokeWidth="0.4" />
          <path d="M-2 58 H102" stroke="#E0DBD1" strokeWidth="0.35" />
          <path d="M-2 76 H102" stroke="#DDD8CE" strokeWidth="0.5" />
          <path d="M18 -2 V102" stroke="#E0DBD1" strokeWidth="0.35" />
          <path d="M58 -2 V102" stroke="#E0DBD1" strokeWidth="0.4" />
          <path d="M78 -2 V102" stroke="#DDD8CE" strokeWidth="0.55" />
          <path d="M92 -2 V102" stroke="#E0DBD1" strokeWidth="0.3" />

          <path d="M4 92 C30 68, 50 76, 98 46" stroke="#D2CCC0" strokeWidth="0.85" fill="none" />
          <path d="M6 10 C34 26, 60 14, 96 38" stroke="#D8D3C8" strokeWidth="0.65" fill="none" />
          <path d="M12 98 C40 80, 55 55, 70 8" stroke="#DED9CF" strokeWidth="0.45" fill="none" />

          {/* Route trails */}
          <path
            d="M24 36 C34 40, 40 42, 46 44 C54 48, 58 54, 64 60"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="0.35"
            strokeDasharray="1.2 1"
            opacity="0.55"
          />
          <path
            d="M56 20 C52 28, 48 36, 46 44"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="0.3"
            strokeDasharray="1.2 1"
            opacity="0.45"
          />

          {/* Parks / water shapes */}
          <ellipse cx="18" cy="76" rx="13" ry="9" fill="#C9DCC7" opacity="0.7" />
          <ellipse cx="82" cy="18" rx="11" ry="8" fill="#CEE0CC" opacity="0.65" />
          <path d="M0 52 C14 48, 20 60, 10 78 L0 86 Z" fill="#BFD4E8" opacity="0.55" />
          <path d="M52 94 C66 86, 82 90, 100 80 V100 H52 Z" fill="#C2D6EA" opacity="0.5" />
        </svg>

        {AREA_LABELS.map((a) => (
          <span
            key={a.label}
            className="pointer-events-none absolute -translate-x-1/2 select-none text-[9px] font-semibold tracking-[0.18em] text-slate-400/70"
            style={{ left: a.x, top: a.y }}
          >
            {a.label}
          </span>
        ))}

        {/* Markers */}
        {filtered.map((shipment) => {
          const isActive = shipment.id === activeId
          return (
            <button
              key={shipment.id}
              type="button"
              onMouseEnter={() => setActiveId(shipment.id)}
              onFocus={() => setActiveId(shipment.id)}
              onClick={() => setActiveId(shipment.id)}
              className="group absolute z-10 -translate-x-1/2 -translate-y-full outline-none"
              style={{ left: `${shipment.x}%`, top: `${shipment.y}%` }}
            >
              <span className="relative flex flex-col items-center">
                <span
                  className={`mb-2.5 flex origin-bottom items-center gap-2.5 rounded-[18px] bg-white/95 px-2.5 py-2 shadow-[0_12px_32px_rgba(15,23,42,0.16)] backdrop-blur-sm transition-all duration-200 ${
                    isActive
                      ? 'translate-y-0 scale-100 opacity-100'
                      : 'pointer-events-none translate-y-1 scale-95 opacity-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100'
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b1220] text-white">
                    <PackageIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="pr-1 text-left">
                    <span className="block text-[12px] font-bold tracking-tight text-slate-900">
                      {shipment.id}
                    </span>
                    <span className="block text-[11px] text-slate-500">{shipment.detail}</span>
                  </span>
                </span>

                <span className="relative">
                  {isActive && (
                    <span className="absolute inset-0 -m-1 animate-ping rounded-full bg-[#0b1220]/20" />
                  )}
                  <span
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-[#0b1220] text-white shadow-[0_8px_20px_rgba(11,18,32,0.28)] transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                  >
                    <PackageIcon />
                  </span>
                </span>
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0b1220] shadow-sm" />
              </span>
            </button>
          )
        })}
      </div>

      {/* Edge vignette */}
      <div className="pointer-events-none absolute inset-0 z-[5] rounded-[28px] shadow-[inset_0_0_60px_rgba(148,163,184,0.18)]" />

      {/* Top toolbar */}
      <div className="relative z-20 flex flex-wrap items-center gap-2 p-3.5 sm:gap-2.5 sm:p-4">
        <label className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full border border-white/80 bg-white/95 px-3.5 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md sm:max-w-[230px]">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full min-w-0 bg-transparent text-[12px] font-medium text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Search area or order"
          />
        </label>

        <div className="relative">
          <button
            type="button"
            onClick={() => setSortOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-3.5 py-2.5 text-[12px] shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md"
          >
            <span className="text-slate-400">Sort by</span>
            <span className="font-semibold text-slate-800">{sortBy}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-slate-400 transition ${sortOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {sortOpen && (
            <div className="absolute left-0 top-[calc(100%+8px)] z-30 min-w-[148px] overflow-hidden rounded-2xl border border-slate-100 bg-white py-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.14)]">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setSortBy(opt)
                    setSortOpen(false)
                  }}
                  className={`block w-full px-3.5 py-2 text-left text-[12px] font-medium transition hover:bg-slate-50 ${
                    sortBy === opt ? 'bg-slate-50 text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-md sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live fleet · MMR
          </span>
          <button
            type="button"
            onClick={() => navigate('/livemap')}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/80 bg-white/95 text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:bg-white hover:text-slate-900"
            aria-label="Open full map"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative z-10 min-h-0 flex-1" />

      {/* Bottom meta + zoom */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-20 flex items-end gap-2">
        {active && (
          <div className="pointer-events-auto rounded-2xl border border-white/80 bg-white/95 px-3 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.1)] backdrop-blur-md">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Selected
            </p>
            <p className="text-[12px] font-bold text-slate-900">
              {active.area}
              <span className="ml-1.5 font-medium text-slate-500">· ETA {active.eta}</span>
            </p>
          </div>
        )}
        <div className="pointer-events-auto rounded-2xl border border-white/80 bg-white/90 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm backdrop-blur-md">
          {filtered.length} active
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(1.4, +(z + 0.1).toFixed(2)))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/95 text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.1)] backdrop-blur-md transition hover:bg-white hover:text-slate-900"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(0.88, +(z - 0.1).toFixed(2)))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/95 text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.1)] backdrop-blur-md transition hover:bg-white hover:text-slate-900"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
