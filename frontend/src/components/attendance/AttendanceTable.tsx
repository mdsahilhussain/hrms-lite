/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Card from "../ui/Card";
import Table from "../ui/Table";
import AttendanceFilter from "./AttendanceFilter";
import AttendanceRow from "./AttendanceRow";
import type { Attendance } from "../../types/attendance";
import { useAttendanceByEmployeeId } from "../../hooks/useAttendance";
import { BookUser } from "lucide-react";
import type { EmployeeAttendanceInfo } from "../../types/employee";

interface AttendanceTableProps {
  selectedEmployee: EmployeeAttendanceInfo | null;
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="py-2 px-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </td>
      <td className="py-2 px-4">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </td>
      <td className="py-2 px-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </td>
    </tr>
  );
}

export default function AttendanceTable({
  selectedEmployee,
}: AttendanceTableProps) {
  const [dateFilter, setDateFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useAttendanceByEmployeeId(
    selectedEmployee?.employee_id as string,
    page,
    20
  );

  const attendanceList = data?.results || [];
  const pagination = data?.pagination;

  const filteredData = dateFilter
    ? attendanceList?.filter((a: any) => a.date === dateFilter)
    : attendanceList || [];

  const totalPresent = filteredData?.filter(
    (a: any) => a.status === "present"
  ).length;

  return (
    <Card className="mt-8">
      <div className="flex items-start justify-between mb-6 border-b-[.6px] pb-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Attendance Records</h2>
          <p className="text-gray-500 text-sm mt-2">
            View attendance records of
            {selectedEmployee ? (
              <span className="bg-blue-500 px-2 py-1 text-white mx-1 rounded">
                {selectedEmployee?.full_name}{" "}
                {`(${selectedEmployee?.employee_id})`}.
              </span>
            ) : (
              "the selected employee."
            )}
            Use the filter to narrow down by date.
          </p>
        </div>
        <AttendanceFilter date={dateFilter} onDataChange={setDateFilter} />
      </div>
      <div className="mb-4 text-sm text-gray-600">
        Total Present Days:
        <span className="font-semibold">{totalPresent}</span>
      </div>

      {isLoading ? (
        <Table
          headers={["Date", "Employee", "Status"]}
          pagination={pagination}
          setPage={setPage}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </Table>
      ) : filteredData?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <BookUser className="size-8 text-red-500" />
          <h1 className="text-lg text-gray-500 font-semibold">
            No attendance records found
          </h1>
          <p className="text-gray-500 w-full text-center">
            It looks like there are no attendance records for this employee.
            Please ensure that attendance has been marked for this employee on
            the relevant dates.
          </p>
        </div>
      ) : (
        <Table
          headers={["Date", "Employee", "Status"]}
          pagination={pagination}
          setPage={setPage}
        >
          {filteredData?.map((record: Attendance) => (
            <AttendanceRow
              key={`${record.employee_id}-${record.date}`}
              record={record}
            />
          ))}
        </Table>
      )}
    </Card>
  );
}
