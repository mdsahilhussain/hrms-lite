import { UserSearch } from "lucide-react";
import { useEmployees } from "../../hooks/useEmployees";
import type { Employee, EmployeeAttendanceInfo } from "../../types/employee";
import Card from "../ui/Card";
import Table from "../ui/Table";
import EmployeeRow from "./EmployeeRow";
import { useState } from "react";

export type EmployeeTableProps = {
  onViewAttendance: (data: EmployeeAttendanceInfo) => void;
  selectedEmployeeId: string;
};

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
      <td className="py-2 px-4">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </td>
      <td className="py-2 px-4">
        <div className="h-8 bg-gray-300 rounded w-full"></div>
      </td>
    </tr>
  );
}

export default function EmployeeTable({
  onViewAttendance,
  selectedEmployeeId,
}: EmployeeTableProps) {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useEmployees(page, 20);

  console.log("Employee data:", data);
  const employees = data?.results || [];
  console.log("Employees array:", employees);
  const pagination = data?.pagination;

  return (
    <Card className="mt-8">
      <h2 className="text-xl font-semibold">Employee Directory</h2>
      <p className="text-gray-500 text-sm mb-6 border-b-[.6px] pb-4">
        View and manage all employees.
      </p>

      {isLoading ? (
        <Table
          headers={["Employee ID", "Name", "Email", "Department", "Actions"]}
          pagination={pagination}
          setPage={setPage}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </Table>
      ) : employees?.length === 0 ? (
        <div className=" w-full flex flex-col gap-2 items-center justify-center py-10">
          <UserSearch className="size-8 text-red-500" />
          <p className="text-lg text-gray-500 font-semibold">
            No employees found
          </p>
          <p className="text-gray-400">
            It looks like there are no empxloyees in the system yet. Please add
            employees to view their attendance records.
          </p>
        </div>
      ) : (
        <Table
          headers={["Employee ID", "Name", "Email", "Department", "Actions"]}
          pagination={pagination}
          setPage={setPage}
        >
          {employees?.map((emp: Employee) => (
            <EmployeeRow
              key={emp.employee_id as string}
              employee={emp as Employee}
              onViewAttendance={onViewAttendance}
              selectedEmployeeId={selectedEmployeeId}
            />
          ))}
        </Table>
      )}
    </Card>
  );
}
