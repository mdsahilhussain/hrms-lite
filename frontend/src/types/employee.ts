import { z } from "zod";

export const employeeSchema = z.object({
  employee_id: z.string().min(1, "Employee ID is required"),
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  department: z.string().min(2, "Department is required"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

export type Employee = {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
};

export interface EmployeeAttendanceInfo {
  employee_id: string;
  full_name: string;
  email: string;
}
