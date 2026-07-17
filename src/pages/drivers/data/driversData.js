export const DRIVER_TABS = ["All", "On delivery", "Idle", "Offline"];

export const STATUS_BADGE = {
  "On delivery": "bg-blue-500 text-white",
  Idle: "bg-slate-800 text-white",
  Offline: "bg-slate-200 text-slate-600",
};

export const DRIVERS = [
  {
    id: "DRV-2014",
    name: "Suresh Kumar",
    hub: "Andheri WH-1",
    vehicle: "MH-01-AC-2381",
    trips: 14,
    status: "On delivery",
    rating: 4.8,
  },
  {
    id: "DRV-2997",
    name: "Imran Shaikh",
    hub: "Bhiwandi WH-2",
    vehicle: "MH-04-BC-1120",
    trips: 11,
    status: "On delivery",
    rating: 4.6,
  },
  {
    id: "DRV-2002",
    name: "Ganesh Patil",
    hub: "Thane WH-3",
    vehicle: "MH-05-CD-7742",
    trips: 6,
    status: "Idle",
    rating: 4.4,
  },
  {
    id: "DRV-2631",
    name: "Rohit More",
    hub: "Powai WH-4",
    vehicle: "MH-02-EF-5590",
    trips: 0,
    status: "Offline",
    rating: 4.7,
  },
  {
    id: "DRV-2044",
    name: "Deepak Rao",
    hub: "Andheri WH-1",
    vehicle: "MH-04-GH-8821",
    trips: 17,
    status: "On delivery",
    rating: 4.9,
  },
  {
    id: "DRV-2052",
    name: "Sachin Talele",
    hub: "Bhiwandi WH-2",
    vehicle: "MH-05-IJ-3310",
    trips: 12,
    status: "On delivery",
    rating: 4.7,
  },
];

// Hourly activity (0h → 23h), 0-4 intensity used for heatmap shading.
export const HOURLY_ACTIVITY = [
  1, 0, 0, 1, 2, 3, 4, 4, 3, 4, 4, 3, 2, 3, 4, 4, 3, 2, 3, 4, 3, 2, 1, 1,
];

export const HUB_SPLIT = [
  { label: "Andheri WH-1", value: 72, color: "bg-blue-500" },
  { label: "Bhiwandi WH-2", value: 18, color: "bg-blue-500" },
  { label: "Thane WH-3", value: 6, color: "bg-slate-700" },
  { label: "Powai WH-4", value: 3, color: "bg-slate-700" },
  { label: "Others", value: 1, color: "bg-slate-700" },
];

export const DRIVER_SUMMARY = [
  { label: "On delivery", count: "18 drivers" },
  { label: "Idle", count: "12 drivers" },
  { label: "Offline", count: "9 drivers" },
];
