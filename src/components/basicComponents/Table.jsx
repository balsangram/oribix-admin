import { MoreHorizontal } from "lucide-react";

export default function CommonTable({
  title,
  tabs = [],
  columns,
  data,
  onViewAll,
}) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="text-xl font-semibold">{title}</h2>

          {tabs.length > 0 && (
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  className={`px-4 py-1 rounded-full text-sm ${
                    tab.active
                      ? "bg-gray-100 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {tab.label}

                  {tab.count && (
                    <span className="ml-2 bg-gray-200 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onViewAll}
          className="font-medium"
        >
          View all →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left px-6 py-4 text-xs uppercase text-gray-500"
                >
                  {column.label}
                </th>
              ))}

              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-5"
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.key]}
                  </td>
                ))}

                <td className="px-6">
                  <div className="flex items-center gap-4">
                    <button className="text-sm font-medium">
                      Reassign
                    </button>

                    <MoreHorizontal size={18} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}