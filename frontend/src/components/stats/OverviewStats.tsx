/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users, NotepadText, UserCheck, UserMinus } from "lucide-react";

import { useAttendanceSummary } from "../../hooks/useAttendance";
import StatCard from "./StatCard";

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg p-4">
      <div className="h-4 bg-gray-300 rounded-full w-4 mb-3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  );
}

export default function OverviewStats() {
  const { data, isLoading } = useAttendanceSummary();
  const stat = data || ({} as any);
  console.log("OverviewStats data:", data);

  const statsConfig = [
    { title: "Employees", value: stat.total_records, Icon: Users },
    {
      title: "Attendance Records",
      value: stat.total_attendance,
      Icon: NotepadText,
    },
    {
      title: "Today Present",
      value: stat.today_present,
      Icon: UserCheck,
      className: "text-green-500",
    },
    {
      title: "Today Absent",
      value: stat.today_absent,
      Icon: UserMinus,
      className: "text-red-500",
    },
  ];

  return (
    <div className="mb-10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Overview
        </h2>
        <p className="text-gray-500 text-sm">
          Real-time summary across employees and attendance records.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : statsConfig.map((item, i) => (
              <StatCard
                key={i}
                title={item.title}
                value={item.value || 0}
                Icon={item.Icon}
                className={item.className}
              />
            ))}
      </div>
    </div>
  );
}
