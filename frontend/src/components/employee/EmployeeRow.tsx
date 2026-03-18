import { useDeleteEmployee } from "../../hooks/useEmployees";
import type { Employee, EmployeeAttendanceInfo } from "../../types/employee";
import Button from "../ui/Button";

type Props = {
  employee: Employee;
  onViewAttendance: (data: EmployeeAttendanceInfo) => void;
};

export default function EmployeeRow({ employee, onViewAttendance }: Props) {
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
        <span className="w-fit h-fit p-1.5 bg-blue-200 rounded text-blue-600 font-semibold border-[.8px] border-blue-600">
          {employee.employee_id}
        </span>
      </td>
      <td className="py-3 capitalize">{employee.full_name}</td>
      <td className="py-3">{employee.email}</td>
      <td className="py-3 uppercase">{employee.department}</td>

      <td className="py-3 flex gap-2">
        <Button
          className="bg-gray-400 hover:bg-gray-300"
          onClick={handlerViewAttendance}
        >
          View Attendance
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
