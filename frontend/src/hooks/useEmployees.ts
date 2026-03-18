import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "../api/employeeApi";
import { toast } from "sonner";
import { AxiosError } from "axios";

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message
    );
  }
  return "Unexpected error occurred";
};

export const useEmployees = (page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: ["employees", "list", page, pageSize],
    queryFn: () => employeeApi.getEmployees(page, pageSize),

    // Smooth pagination
    placeholderData: (prev) => prev,

    // Clean response
    select: (res) => res || { results: [], pagination: {} },
  });
};

export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeApi.addEmployee,

    onSuccess: (data) => {
      // Invalidate employee list to include the new employee
      queryClient.invalidateQueries({
        queryKey: ["employees"],
        refetchType: "active",
      });

      // Refetch attendance summary to reflect new employee
      queryClient.invalidateQueries({
        queryKey: ["attendance"],
        refetchType: "active",
      });

      toast.success("Employee added successfully.", {
        description: `${
          data?.data?.full_name ?? "Employee"
        } has been added to the system.`,
      });
    },

    onError: (error: unknown) => {
      toast.error("Error adding employee", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeApi.deleteEmployee,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
        refetchType: "active",
      });

      toast.success("Employee deleted successfully.");
    },

    onError: (error: unknown) => {
      toast.error("Error deleting employee", {
        description: getErrorMessage(error),
      });
    },
  });
};
