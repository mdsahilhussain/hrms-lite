import { useDeleteEmployee } from "../../hooks/useEmployees";
import { cn } from "../../lib/utils";
import type { Employee, EmployeeAttendanceInfo } from "../../types/employee";
import Button from "../ui/Button";

type Props = {
  employee: Employee;
  selectedEmployeeId: string;
  onViewAttendance: (data: EmployeeAttendanceInfo) => void;
};

export default function EmployeeRow({
  employee,
  onViewAttendance,
  selectedEmployeeId,
}: Props) {
  const { mutate } = useDeleteEmployee();

  function handlerViewAttendance() {
    onViewAttendance({
      employee_id: employee.employee_id,
      full_name: employee.full_name,
      email: employee.email,
    });
  }

  return (
    <tr className="border-b border-gray-100 text-sm">
      <td className="py-3">
        <span className="w-fit h-fit p-1.5 bg-blue-100 rounded text-blue-600 font-semibold border-[.8px] border-blue-600">
          {employee.employee_id}
        </span>
      </td>
      <td className="py-3 capitalize">{employee.full_name}</td>
      <td className="py-3">{employee.email}</td>
      <td className="py-3 uppercase">{employee.department}</td>

      <td className="py-3 flex gap-2">
        <Button
          className={cn(
            "bg-gray-500 hover:bg-gray-400",
            employee.employee_id === selectedEmployeeId &&
              "bg-blue-500 hover:bg-blue-400"
          )}
          onClick={handlerViewAttendance}
        >
          {employee.employee_id === selectedEmployeeId
            ? "Viewing"
            : "View Attendance"}
        </Button>

        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={() => {
            mutate(employee.employee_id as string);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
