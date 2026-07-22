import React from "react";
import { Info, RefreshCw } from "lucide-react";
import {
  Demand_Heat_Card,
  getHeatColor,
} from "../../../components/basicComponents/Card";

const MAX_CARDS = 66;
const HEAT_THRESHOLDS = [0, 1, 3, 7, 15];

const TIME_RANGES = [
  { id: "60m", label: "60m", title: "Last 60 Min", from: "-60 min" },
  { id: "24h", label: "24h", title: "Last 24 Hours", from: "-24 h" },
  { id: "1w", label: "1w", title: "Last 1 Week", from: "-1 week" },
];

/** Base hubs — orders keyed by time range; updatedAt = newest first for “latest 66” */
const warehouses = [
  { warehouseName: "WH-MUM-05 Lower Parel", address: "Kamala Mills, Lower Parel, Mumbai, MH 400013", orders: { "60m": 22, "24h": 148, "1w": 920 }, updatedAt: 66 },
  { warehouseName: "WH-MUM-04 Dadar", address: "Dadar TT Circle, Mumbai, MH 400014", orders: { "60m": 19, "24h": 132, "1w": 810 }, updatedAt: 65 },
  { warehouseName: "WH-HYD-01 Hyderabad", address: "HITEC City, Hyderabad, TS 500081", orders: { "60m": 18, "24h": 126, "1w": 780 }, updatedAt: 64 },
  { warehouseName: "WH-BLR-09 Marathahalli", address: "Outer Ring Road, Marathahalli, Bengaluru, KA 560037", orders: { "60m": 17, "24h": 118, "1w": 740 }, updatedAt: 63 },
  { warehouseName: "WH-NOI-01 Noida", address: "Sector 62, Noida, UP 201309", orders: { "60m": 16, "24h": 110, "1w": 690 }, updatedAt: 62 },
  { warehouseName: "WH-BLR-08 HSR", address: "HSR Layout Sector 2, Bengaluru, KA 560102", orders: { "60m": 15, "24h": 104, "1w": 650 }, updatedAt: 61 },
  { warehouseName: "WH-CHN-03 OMR", address: "OMR IT Corridor, Chennai, TN 600119", orders: { "60m": 14, "24h": 98, "1w": 610 }, updatedAt: 60 },
  { warehouseName: "WH-BLR-01 Koramangala", address: "5th Block, Koramangala, Bengaluru, KA 560095", orders: { "60m": 12, "24h": 86, "1w": 540 }, updatedAt: 59 },
  { warehouseName: "WH-GGN-01 Gurgaon", address: "Cyber City, Gurgaon, HR 122002", orders: { "60m": 11, "24h": 78, "1w": 490 }, updatedAt: 58 },
  { warehouseName: "WH-AHM-01 Ahmedabad", address: "SG Highway, Ahmedabad, GJ 380054", orders: { "60m": 10, "24h": 72, "1w": 450 }, updatedAt: 57 },
  { warehouseName: "WH-DEL-01 Connaught", address: "Connaught Place, New Delhi, DL 110001", orders: { "60m": 9, "24h": 64, "1w": 400 }, updatedAt: 56 },
  { warehouseName: "WH-PUN-01 Pune East", address: "Wagholi, Pune, MH 412207", orders: { "60m": 8, "24h": 58, "1w": 360 }, updatedAt: 55 },
  { warehouseName: "WH-HYD-03 Gachibowli", address: "Financial District, Gachibowli, TS 500032", orders: { "60m": 8, "24h": 55, "1w": 340 }, updatedAt: 54 },
  { warehouseName: "WH-BLR-04 MG Road", address: "MG Road Metro, Bengaluru, KA 560001", orders: { "60m": 7, "24h": 50, "1w": 310 }, updatedAt: 53 },
  { warehouseName: "WH-KOL-01 Kolkata", address: "Park Street, Kolkata, WB 700016", orders: { "60m": 7, "24h": 48, "1w": 300 }, updatedAt: 52 },
  { warehouseName: "WH-AUR-01 Aurangabad", address: "Chikalthana MIDC, Aurangabad, MH 431006", orders: { "60m": 6, "24h": 42, "1w": 260 }, updatedAt: 51 },
  { warehouseName: "WH-CHN-01 T Nagar", address: "Usman Road, T Nagar, Chennai, TN 600017", orders: { "60m": 6, "24h": 40, "1w": 250 }, updatedAt: 50 },
  { warehouseName: "WH-BLR-02 Whitefield", address: "ITPL Main Road, Whitefield, Bengaluru, KA 560066", orders: { "60m": 5, "24h": 36, "1w": 220 }, updatedAt: 49 },
  { warehouseName: "WH-JAI-01 Jaipur", address: "Sitapura Industrial Area, Jaipur, RJ 302022", orders: { "60m": 5, "24h": 34, "1w": 210 }, updatedAt: 48 },
  { warehouseName: "WH-IND-01 Indore", address: "Pithampur Industrial Area, Indore, MP 454775", orders: { "60m": 5, "24h": 33, "1w": 205 }, updatedAt: 47 },
  { warehouseName: "WH-THN-01 Thane", address: "Wagle Industrial Estate, Thane, MH 400604", orders: { "60m": 4, "24h": 28, "1w": 170 }, updatedAt: 46 },
  { warehouseName: "WH-DEL-02 Saket", address: "Saket District Centre, New Delhi, DL 110017", orders: { "60m": 4, "24h": 27, "1w": 165 }, updatedAt: 45 },
  { warehouseName: "WH-HYD-02 Secunderabad", address: "Begumpet, Secunderabad, TS 500016", orders: { "60m": 4, "24h": 26, "1w": 160 }, updatedAt: 44 },
  { warehouseName: "WH-BBS-01 Bhubaneswar", address: "Infocity, Bhubaneswar, OD 751024", orders: { "60m": 4, "24h": 25, "1w": 155 }, updatedAt: 43 },
  { warehouseName: "WH-PUN-02 Pune West", address: "Hinjewadi Phase 2, Pune, MH 411057", orders: { "60m": 3, "24h": 22, "1w": 135 }, updatedAt: 42 },
  { warehouseName: "WH-MYS-01 Mysore", address: "Hebbal Industrial Area, Mysore, KA 570016", orders: { "60m": 3, "24h": 21, "1w": 130 }, updatedAt: 41 },
  { warehouseName: "WH-LKO-01 Lucknow", address: "Amausi Industrial Area, Lucknow, UP 226009", orders: { "60m": 3, "24h": 20, "1w": 125 }, updatedAt: 40 },
  { warehouseName: "WH-KOL-02 Salt Lake", address: "Sector V, Salt Lake, Kolkata, WB 700091", orders: { "60m": 3, "24h": 19, "1w": 120 }, updatedAt: 39 },
  { warehouseName: "WH-GOA-01 Panaji", address: "Verna Industrial Estate, Goa 403722", orders: { "60m": 3, "24h": 18, "1w": 115 }, updatedAt: 38 },
  { warehouseName: "WH-MUM-03 Powai", address: "Hiranandani Gardens, Powai, Mumbai, MH 400076", orders: { "60m": 2, "24h": 16, "1w": 95 }, updatedAt: 37 },
  { warehouseName: "WH-BLR-05 Electronic City", address: "Phase 1, Electronic City, Bengaluru, KA 560100", orders: { "60m": 2, "24h": 15, "1w": 90 }, updatedAt: 36 },
  { warehouseName: "WH-FBD-01 Faridabad", address: "Sector 15A, Faridabad, HR 121007", orders: { "60m": 2, "24h": 14, "1w": 88 }, updatedAt: 35 },
  { warehouseName: "WH-SRT-01 Surat", address: "Sachin GIDC, Surat, GJ 394230", orders: { "60m": 2, "24h": 14, "1w": 85 }, updatedAt: 34 },
  { warehouseName: "WH-GAU-01 Guwahati", address: "Amingaon, Guwahati, AS 781031", orders: { "60m": 2, "24h": 13, "1w": 80 }, updatedAt: 33 },
  { warehouseName: "WH-CBE-01 Coimbatore", address: "Peelamedu, Coimbatore, TN 641004", orders: { "60m": 2, "24h": 13, "1w": 78 }, updatedAt: 32 },
  { warehouseName: "WH-MUM-02 Bandra", address: "Bandra Kurla Complex, Mumbai, MH 400051", orders: { "60m": 1, "24h": 10, "1w": 62 }, updatedAt: 31 },
  { warehouseName: "WH-NAG-01 Nagpur", address: "MIDC Hingna, Nagpur, MH 440016", orders: { "60m": 1, "24h": 9, "1w": 58 }, updatedAt: 30 },
  { warehouseName: "WH-BLR-06 Jayanagar", address: "4th Block, Jayanagar, Bengaluru, KA 560011", orders: { "60m": 1, "24h": 9, "1w": 55 }, updatedAt: 29 },
  { warehouseName: "WH-GZB-01 Ghaziabad", address: "Sahibabad Industrial Area, Ghaziabad, UP 201010", orders: { "60m": 1, "24h": 8, "1w": 52 }, updatedAt: 28 },
  { warehouseName: "WH-MDU-01 Madurai", address: "Kappalur SIDCO, Madurai, TN 625008", orders: { "60m": 1, "24h": 8, "1w": 50 }, updatedAt: 27 },
  { warehouseName: "WH-TVM-01 Trivandrum", address: "Technopark, Trivandrum, KL 695581", orders: { "60m": 1, "24h": 7, "1w": 48 }, updatedAt: 26 },
  { warehouseName: "WH-BPL-01 Bhopal", address: "Govindpura Industrial Area, Bhopal, MP 462023", orders: { "60m": 1, "24h": 7, "1w": 45 }, updatedAt: 25 },
  { warehouseName: "WH-VZG-01 Vizag", address: "Gajuwaka, Visakhapatnam, AP 530026", orders: { "60m": 1, "24h": 6, "1w": 42 }, updatedAt: 24 },
  { warehouseName: "WH-MUM-01 Andheri", address: "Andheri East, Mumbai, MH 400069", orders: { "60m": 0, "24h": 4, "1w": 28 }, updatedAt: 23 },
  { warehouseName: "WH-MUM-06 Navi", address: "Vashi Sector 30, Navi Mumbai, MH 400703", orders: { "60m": 0, "24h": 3, "1w": 22 }, updatedAt: 22 },
  { warehouseName: "WH-NSK-01 Nashik", address: "Satpur MIDC, Nashik, MH 422007", orders: { "60m": 0, "24h": 3, "1w": 20 }, updatedAt: 21 },
  { warehouseName: "WH-BLR-03 Indiranagar", address: "100ft Road, Indiranagar, Bengaluru, KA 560038", orders: { "60m": 0, "24h": 2, "1w": 18 }, updatedAt: 20 },
  { warehouseName: "WH-BLR-07 Yelahanka", address: "Yelahanka New Town, Bengaluru, KA 560064", orders: { "60m": 0, "24h": 2, "1w": 16 }, updatedAt: 19 },
  { warehouseName: "WH-HBL-01 Hubli", address: "Gokul Road, Hubli, KA 580030", orders: { "60m": 0, "24h": 2, "1w": 14 }, updatedAt: 18 },
  { warehouseName: "WH-DEL-03 Dwarka", address: "Sector 21, Dwarka, New Delhi, DL 110075", orders: { "60m": 0, "24h": 1, "1w": 12 }, updatedAt: 17 },
  { warehouseName: "WH-CHD-01 Chandigarh", address: "Industrial Area Phase 1, Chandigarh 160002", orders: { "60m": 0, "24h": 1, "1w": 11 }, updatedAt: 16 },
  { warehouseName: "WH-CHN-02 Anna Nagar", address: "2nd Avenue, Anna Nagar, Chennai, TN 600040", orders: { "60m": 0, "24h": 1, "1w": 10 }, updatedAt: 15 },
  { warehouseName: "WH-KOC-01 Kochi", address: "Kakkanad Infopark, Kochi, KL 682030", orders: { "60m": 0, "24h": 1, "1w": 9 }, updatedAt: 14 },
  { warehouseName: "WH-HWH-01 Howrah", address: "Belur Road, Howrah, WB 711202", orders: { "60m": 0, "24h": 0, "1w": 8 }, updatedAt: 13 },
  { warehouseName: "WH-VAD-01 Vadodara", address: "Makarpura GIDC, Vadodara, GJ 390010", orders: { "60m": 0, "24h": 0, "1w": 7 }, updatedAt: 12 },
  { warehouseName: "WH-PAT-01 Patna", address: "Boring Road, Patna, BR 800001", orders: { "60m": 0, "24h": 0, "1w": 6 }, updatedAt: 11 },
  { warehouseName: "WH-VJA-01 Vijayawada", address: "Auto Nagar, Vijayawada, AP 520007", orders: { "60m": 0, "24h": 0, "1w": 5 }, updatedAt: 10 },
  { warehouseName: "WH-MUM-07 Worli", address: "Worli Sea Face, Mumbai, MH 400018", orders: { "60m": 13, "24h": 92, "1w": 570 }, updatedAt: 9 },
  { warehouseName: "WH-BLR-10 Bellandur", address: "Bellandur ORR, Bengaluru, KA 560103", orders: { "60m": 9, "24h": 66, "1w": 410 }, updatedAt: 8 },
  { warehouseName: "WH-DEL-04 Rohini", address: "Sector 9, Rohini, New Delhi, DL 110085", orders: { "60m": 5, "24h": 38, "1w": 230 }, updatedAt: 7 },
  { warehouseName: "WH-HYD-04 Madhapur", address: "Madhapur Main Road, Hyderabad, TS 500081", orders: { "60m": 11, "24h": 80, "1w": 500 }, updatedAt: 6 },
  { warehouseName: "WH-CHN-04 Guindy", address: "Guindy Industrial Estate, Chennai, TN 600032", orders: { "60m": 6, "24h": 44, "1w": 270 }, updatedAt: 5 },
  { warehouseName: "WH-PUN-03 Baner", address: "Baner Road, Pune, MH 411045", orders: { "60m": 4, "24h": 30, "1w": 185 }, updatedAt: 4 },
  { warehouseName: "WH-KOL-03 Newtown", address: "Action Area I, Newtown, Kolkata, WB 700156", orders: { "60m": 2, "24h": 15, "1w": 92 }, updatedAt: 3 },
  { warehouseName: "WH-AHM-02 SG Road", address: "Prahlad Nagar, Ahmedabad, GJ 380015", orders: { "60m": 7, "24h": 52, "1w": 320 }, updatedAt: 2 },
  { warehouseName: "WH-JAI-02 Malviya Nagar", address: "Malviya Nagar, Jaipur, RJ 302017", orders: { "60m": 3, "24h": 20, "1w": 125 }, updatedAt: 1 },
  // Extra older hubs (rank below latest 66 cutoff when more exist)
  { warehouseName: "WH-RAN-01 Ranchi", address: "Harmu Road, Ranchi, JH 834002", orders: { "60m": 1, "24h": 6, "1w": 40 }, updatedAt: 0 },
  { warehouseName: "WH-RPR-01 Raipur", address: "Pandri, Raipur, CG 492001", orders: { "60m": 0, "24h": 2, "1w": 15 }, updatedAt: -1 },
  { warehouseName: "WH-AGR-01 Agra", address: "Sikandra, Agra, UP 282007", orders: { "60m": 2, "24h": 12, "1w": 70 }, updatedAt: -2 },
];

function shuffle(list) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function getLatestWarehouses(rangeId) {
  return [...warehouses]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, MAX_CARDS)
    .map((w) => ({
      warehouseName: w.warehouseName,
      address: w.address,
      orders: w.orders[rangeId] ?? 0,
    }));
}

export default function DemandHeatMap_B() {
  const [rangeId, setRangeId] = React.useState("60m");
  const [cards, setCards] = React.useState(() =>
    shuffle(getLatestWarehouses("60m"))
  );

  const range = TIME_RANGES.find((r) => r.id === rangeId) ?? TIME_RANGES[0];

  const applyRange = (nextRangeId) => {
    setRangeId(nextRangeId);
    setCards(shuffle(getLatestWarehouses(nextRangeId)));
  };

  const refresh = () => {
    setCards(shuffle(getLatestWarehouses(rangeId)));
  };

  const total = cards.reduce((sum, w) => sum + w.orders, 0);
  const avg = cards.length ? (total / cards.length).toFixed(1) : "0";
  const peak = cards.reduce(
    (best, w) => (w.orders > best.orders ? w : best),
    { orders: -1, warehouseName: "" }
  );

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
            Demand Heat-Map — {range.title}
          </h2>
          <Info className="w-3 h-3 text-gray-400" />
          <span className="text-[10px] text-gray-400">
            showing {cards.length} / {MAX_CARDS} latest
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-lg bg-[#2A2A2A] p-0.5">
            {TIME_RANGES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => applyRange(r.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  rangeId === r.id
                    ? "bg-white text-gray-900"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={refresh}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2A2A2A] text-white text-[11px] font-medium"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-2 bg-[#F7F7F5] rounded-xl p-3 border border-gray-100">
        {cards.map((warehouse) => (
          <Demand_Heat_Card
            key={warehouse.warehouseName}
            warehouseName={warehouse.warehouseName}
            address={warehouse.address}
            orders={warehouse.orders}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
        <div className="flex items-center gap-2">
          <span>{range.from}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>now</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span>low</span>
          {HEAT_THRESHOLDS.map((threshold) => (
            <span
              key={threshold}
              className="w-3.5 h-3.5 rounded-sm border border-black/5"
              style={{ backgroundColor: getHeatColor(threshold) }}
              title={`${threshold}${threshold === 15 ? "+" : ""} orders`}
            />
          ))}
          <span>high</span>
        </div>

        <div className="flex items-center gap-3">
          <span>
            total <strong className="text-gray-700">{total}</strong>
          </span>
          <span>
            avg/cell <strong className="text-gray-700">{avg}</strong>
          </span>
          <span>
            peak{" "}
            <strong className="text-gray-700">
              {peak.orders} in {peak.warehouseName}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}
