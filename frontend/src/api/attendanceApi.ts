import type { Attendance } from "../types/attendance";
import { api } from "./axios";

export const attendanceApi = {
  getAttendanceByDate: async (attendance_date: string, page=1, pageSize=20) => {
    const res = await api.get(`/attendance/date/${attendance_date}?page=${page}&page_size=${pageSize}`);
    return res.data;
  },
  getAttendanceByEmployeeId: async (
    employee_id: string,
    page = 1,
    pageSize = 20
  ) => {
    const res = await api.get(
      `/attendance/employee/${employee_id}?page=${page}&page_size=${pageSize}`
    );

    return res.data?.data || { results: [], pagination: {} };
  },
  markAttendance: async (data: Attendance) => {
    const res = await api.post("/attendance", data);
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to mark attendance");
    }
    return res.data;
  },
  getAllSummary: async () => {
    const res = await api.get("/attendance/summary");
    return res.data;
  },
};
