import { cn } from "../../lib/utils";
import type { Attendance } from "../../types/attendance";

type Props = {
  record: Attendance;
};

export default function AttendanceRow({ record }: Props) {
  return (
    <tr className="border-b border-gray-100 text-sm">
      <td className="py-3">{record.date}</td>
      <td className="py-3">
        <span className="w-fit h-fit p-1.5 bg-blue-100 rounded text-blue-600 font-semibold border-[.8px] border-blue-600 mr-2">
          {record.employee_id}
        </span>
        {record.full_name}
      </td>
      <td className="py-3">
        <span
          className={cn(
            "px-2 py-1 rounded text-sm capitalize",
            record.status === "present"
              ? "bg-green-100 text-green-600 border[.8px] border-green-600"
              : "bg-red-100 text-red-600 border[.8px] border-red-600"
          )}
        >
          {record.status}
        </span>
      </td>
    </tr>
  );
}
