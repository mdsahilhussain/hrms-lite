import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceApi } from "../api/attendanceApi";
import { toast } from "sonner";
import { getErrorMessage } from "../lib/utils";

// Attendance by Date
export const useAttendanceByDate = (
  date: string,
  page = 1,
  pageSize = 20
) => {
  return useQuery({
    queryKey: ["attendance", "date", date, page, pageSize],
    queryFn: () => attendanceApi.getAttendanceByDate(date, page, pageSize),
    enabled: !!date,

    // clean response
    select: (res) => res?.data || { results: [], pagination: {} },
  });
};

// Attendance by Employee (with pagination)
export const useAttendanceByEmployeeId = (
  employee_id: string,
  page = 1,
  pageSize = 20
) => {
  return useQuery({
    queryKey: ["attendance", "employee", employee_id, page, pageSize],
    queryFn: () =>
      attendanceApi.getAttendanceByEmployeeId(employee_id, page, pageSize),
    enabled: !!employee_id,

    // prevent UI flicker when page changes
    placeholderData: (prev) => prev,

    // clean response
    select: (res) => res || { results: [], pagination: {} },
  });
};

// 🔹 Mark Attendance
export const useMarkAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: attendanceApi.markAttendance,

    onSuccess: (_, variables) => {
      // 🔥 invalidate ALL attendance-related queries
      queryClient.invalidateQueries({
        queryKey: ["attendance"],
        refetchType: "active",
      });

      toast.success("Attendance marked successfully", {
        description: `Marked as ${variables.status} on ${variables.date}`,
      });
    },

    onError: (error: unknown) => {
      console.error("Error marking attendance:", error);
      toast.error("Error marking attendance.", {
        description: getErrorMessage(error),
      });
    },
  });
};

// 🔹 Attendance Summary (Dashboard)
export const useAttendanceSummary = () => {
  return useQuery({
    queryKey: ["attendance", "summary"],
    queryFn: attendanceApi.getAllSummary,

    // Cache summary for 5 minutes to reduce load on dashboard
    staleTime: 1000 * 60 * 5,

    // clean response
    select: (res) => res?.data || {},
  });
};
