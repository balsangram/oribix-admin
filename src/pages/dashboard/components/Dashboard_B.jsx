import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";

const gmvData = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 48 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 55 },
  { day: "Fri", value: 54 },
  { day: "Sat", value: 62 },
  { day: "Sun", value: 67 },
];

const pipelineData = [
  { name: "New", value: 42, color: "#2F80ED" },
  { name: "Accepted", value: 38, color: "#0F172A" },
  { name: "Picking", value: 56, color: "#475569" },
  { name: "Packed", value: 48, color: "#64748B" },
  { name: "Dispatched", value: 54, color: "#94A3B8" },
  { name: "Delivered", value: 46, color: "#CBD5E1" },
];

export default function Dashboard_B() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-6 mt-6 items-stretch">
      <Network_GMV />
      <Pipeline_By_Stage />
    </div>
  );
}

function Network_GMV() {
  return (
    <div className="h-[400px] rounded-3xl border bg-white p-6 shadow-sm flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg">
            Network GMV · 7 Days
          </h2>

          <div className="flex items-end gap-3 mt-3">
            <h1 className="text-4xl font-bold">
              ₹42,00,000
            </h1>

            <p className="text-green-600 font-medium mb-1">
              ↗ 24.2%
              <span className="text-gray-500 ml-2">
                vs last 7 days
              </span>
            </p>
          </div>
        </div>

        <select className="border rounded-xl px-4 h-10">
          <option>7 Days</option>
          <option>30 Days</option>
          <option>90 Days</option>
        </select>
      </div>

      <div className="flex-1 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={gmvData}>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
            />

            <Bar
              dataKey="value"
              radius={[20, 20, 20, 20]}
              barSize={24}
            >
              {gmvData.map((item) => (
                <Cell
                  key={item.day}
                  fill="#1E2A5A"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Pipeline_By_Stage() {
  return (
    <div className="h-[400px] rounded-3xl border bg-white p-6 shadow-sm flex flex-col">
      <h2 className="font-semibold text-lg mb-5">
        Pipeline by Stage
      </h2>

      <div className="flex flex-1 items-center gap-6">
        <div className="w-44 h-44 relative flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pipelineData}
                dataKey="value"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
              >
                {pipelineData.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500">
              IN-FLIGHT
            </p>

            <h2 className="text-3xl font-bold">
              284
            </h2>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-3">
          {pipelineData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: item.color }}
                />

                <span className="text-gray-700">
                  {item.name}
                </span>
              </div>

              <span className="font-semibold">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}