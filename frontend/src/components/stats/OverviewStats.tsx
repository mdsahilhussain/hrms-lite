/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAllAttendance } from "../../hooks/useAttendance";
import StatCard from "./StatCard";
import { Users, NotepadText, UserCheck, UserMinus } from "lucide-react";

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
  const { data, isLoading } = useAllAttendance();
  const stat = data?.data || ({} as any);

  const statsConfig = [
    { title: "Employees", value: stat.employees, Icon: Users },
    {
      title: "Attendance Records",
      value: stat.attendance_records,
      Icon: NotepadText,
    },
    {
      title: "Present Entries",
      value: stat.present_entries,
      Icon: UserCheck,
      className: "text-green-500",
    },
    {
      title: "Absent Entries",
      value: stat.absent_entries,
      Icon: UserMinus,
        className: "text-red-500",
    },
  ];

  return (
    <div className="mb-10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Overview
        </h2>
        <p className="text-gray-500 text-sm">
          Real-time summary across employees and attendance records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
