import { z } from "zod";

export const attendanceSchema = z.object({
  employee_id: z.string().min(1, "Employee is required"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["present", "absent"]),
});

export type AttendanceFormData = z.infer<typeof attendanceSchema>;

export type Attendance = {
  employee_id: string;
  date: string;
  status: "present" | "absent";
  full_name?: string; // Added full_name for display purposes
};
