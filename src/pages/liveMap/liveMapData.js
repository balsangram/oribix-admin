export const STATUS = {
  ON_ROUTE: "on-route",
  LOADING: "loading",
  DELAYED: "delayed",
  IDLE: "idle",
};

export const statusMeta = {
  [STATUS.ON_ROUTE]: {
    label: "On route",
    filterLabel: "On-Route",
    color: "#16A34A",
    bg: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  [STATUS.LOADING]: {
    label: "Loading",
    filterLabel: "Loading",
    color: "#CA8A04",
    bg: "bg-amber-500",
    chip: "bg-amber-50 text-amber-700 border-amber-200",
  },
  [STATUS.DELAYED]: {
    label: "Delayed",
    filterLabel: "Delayed",
    color: "#EA580C",
    bg: "bg-orange-500",
    chip: "bg-orange-50 text-orange-700 border-orange-200",
  },
  [STATUS.IDLE]: {
    label: "Idle",
    filterLabel: "Idle",
    color: "#64748B",
    bg: "bg-slate-400",
    chip: "bg-slate-50 text-slate-600 border-slate-200",
  },
};

export const summaryStats = [
  { key: "on-route", label: "on route", count: 3, className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { key: "loading", label: "loading", count: 1, className: "bg-amber-50 text-amber-700 border-amber-200" },
  { key: "delayed", label: "delayed", count: 1, className: "bg-orange-50 text-orange-700 border-orange-200" },
  { key: "hubs", label: "hubs", count: 5, className: "bg-slate-900 text-white border-slate-900" },
];

/** Positions are % within the map canvas (Bengaluru-ish layout) */
export const hubs = [
  { id: "h1", name: "Whitefield", x: 72, y: 42 },
  { id: "h2", name: "Electronic City", x: 48, y: 78 },
  { id: "h3", name: "Peenya", x: 28, y: 28 },
  { id: "h4", name: "Hebbal", x: 42, y: 18 },
  { id: "h5", name: "Koramangala", x: 55, y: 58 },
];

export const drivers = [
  {
    id: "d1",
    name: "Suresh Kumar",
    vehicleId: "HZ-D-118",
    plate: "KA-05 MZ 8842",
    status: STATUS.ON_ROUTE,
    cargo: "12 bags",
    eta: "9m",
    speed: "38 km/h",
    hub: "Whitefield",
    x: 62,
    y: 38,
    route: [
      [48, 78],
      [55, 58],
      [62, 38],
      [72, 42],
    ],
    stops: [
      { title: "Whitefield Hub", detail: "pickup" },
      { title: "HZ-8842 / 12 Bags", detail: "in transit" },
    ],
  },
  {
    id: "d2",
    name: "Anjali Rao",
    vehicleId: "HZ-D-204",
    plate: "KA-03 AB 1120",
    status: STATUS.ON_ROUTE,
    cargo: "8 bags",
    eta: "14m",
    speed: "42 km/h",
    hub: "Koramangala",
    x: 58,
    y: 52,
    route: [
      [28, 28],
      [42, 35],
      [55, 48],
      [58, 52],
    ],
    stops: [
      { title: "Peenya Hub", detail: "pickup" },
      { title: "HZ-1120 / 8 Bags", detail: "in transit" },
    ],
  },
  {
    id: "d3",
    name: "Vikram Singh",
    vehicleId: "HZ-D-091",
    plate: "KA-01 CD 5567",
    status: STATUS.IDLE,
    cargo: "—",
    eta: "Idle",
    speed: "0 km/h",
    hub: "Hebbal",
    x: 40,
    y: 22,
    route: [],
    stops: [{ title: "Hebbal Hub", detail: "awaiting dispatch" }],
  },
  {
    id: "d4",
    name: "Meera Nair",
    vehicleId: "HZ-D-330",
    plate: "KA-04 EF 2291",
    status: STATUS.DELAYED,
    cargo: "15 bags",
    eta: "22m",
    speed: "18 km/h",
    hub: "Electronic City",
    x: 50,
    y: 70,
    route: [
      [72, 42],
      [60, 55],
      [50, 70],
      [48, 78],
    ],
    stops: [
      { title: "Whitefield Hub", detail: "pickup delayed" },
      { title: "HZ-2291 / 15 Bags", detail: "traffic hold" },
    ],
  },
  {
    id: "d5",
    name: "Ravi Patel",
    vehicleId: "HZ-D-156",
    plate: "KA-02 GH 7734",
    status: STATUS.LOADING,
    cargo: "Loading",
    eta: "—",
    speed: "0 km/h",
    hub: "Peenya",
    x: 30,
    y: 32,
    route: [],
    stops: [{ title: "Peenya Hub", detail: "loading bay 3" }],
  },
  {
    id: "d6",
    name: "Priya Menon",
    vehicleId: "HZ-D-412",
    plate: "KA-05 JK 4410",
    status: STATUS.ON_ROUTE,
    cargo: "6 bags",
    eta: "11m",
    speed: "45 km/h",
    hub: "Hebbal",
    x: 45,
    y: 30,
    route: [
      [55, 58],
      [48, 40],
      [45, 30],
      [42, 18],
    ],
    stops: [
      { title: "Koramangala Hub", detail: "pickup" },
      { title: "HZ-4410 / 6 Bags", detail: "in transit" },
    ],
  },
];

export const filterChips = [
  { key: "all", label: "All" },
  { key: STATUS.ON_ROUTE, label: "On-Route" },
  { key: STATUS.DELAYED, label: "Delayed" },
  { key: STATUS.IDLE, label: "Idle" },
  { key: STATUS.LOADING, label: "Loading" },
];

export const mapLayers = [
  { id: "fleet", label: "Fleet", defaultOn: true },
  { id: "hubs", label: "Hubs", defaultOn: true },
  { id: "routes", label: "Routes", defaultOn: true },
  { id: "traffic", label: "Traffic", defaultOn: false },
];
