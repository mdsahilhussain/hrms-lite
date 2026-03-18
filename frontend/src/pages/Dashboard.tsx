import { useState } from "react";
import AttendanceTable from "../components/attendance/AttendanceTable";

import MarkAttendanceForm from "../components/attendance/MarkAttendanceForm";
import AddEmployeeForm from "../components/employee/AddEmployeeForm";
import EmployeeTable from "../components/employee/EmployeeTable";
import Header from "../components/layout/Header";
import OverviewStats from "../components/stats/OverviewStats";
import type { EmployeeAttendanceInfo } from "../types/employee";

export default function Dashboard() {
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeAttendanceInfo | null>(null);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Header />
      <OverviewStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddEmployeeForm />
        <MarkAttendanceForm />
      </div>

      <EmployeeTable
        onViewAttendance={setSelectedEmployee}
        selectedEmployee={selectedEmployee}
      />
      <AttendanceTable selectedEmployee={selectedEmployee} />
    </div>
  );
}
