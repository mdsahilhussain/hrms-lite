import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceApi } from "../api/attendanceApi";
import { toast } from "sonner";

export const useAttendanceByDate = (date: string) => {
  return useQuery({
    queryKey: ["attendance_date", date],
    queryFn: () => attendanceApi.getAttendanceByDate(date),
    enabled: !!date,
  });
};

export const useAttendanceByEmployeeId = (
  employee_id: string,
  page = 1,
  pageSize = 20
) => {
  return useQuery({
    queryKey: ["attendance_employee", employee_id, page, pageSize],
    queryFn: () =>
      attendanceApi.getAttendanceByEmployeeId(employee_id, page, pageSize),
    enabled: !!employee_id,
  });
};

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: attendanceApi.markAttendance,

    onSuccess: (_, variables) => {
      // variables = data passed to mutate()
      queryClient.invalidateQueries({
        queryKey: ["attendance_date"],
      });

      queryClient.invalidateQueries({
        queryKey: ["attendance_employee", variables.employee_id],
      });

      toast.success("Attendance marked successfully", {
        description: `Marked as ${variables.status} on ${variables.date}`,
      });
    },

    onError: (error) => {
      console.error("Error marking attendance:", error);
      toast.error("Error marking attendance. Please try again.");
    },
  });
};

export const useAllAttendance = () => {
  return useQuery({
    queryKey: ["all_attendance"],
    queryFn: attendanceApi.getAllAttendance,
    staleTime: 1000 * 60 * 5,
  });
};
