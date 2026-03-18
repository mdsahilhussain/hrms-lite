import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "../api/employeeApi";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useEmployees = (page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: ["employees", page, pageSize],
    queryFn: () => employeeApi.getEmployees(page, pageSize),
  });
};

export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeApi.addEmployee,
    onSuccess: (data) => {
      console.log("Employee added successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee added successfully.", {
        description: `${data?.data?.full_name} has been added to the system.`,
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error("Error adding employee", {
          description:
            error.response?.data?.message ||
            error.response?.data?.detail ||
            error.message,
        });
      } else {
        toast.error("Error adding employee", {
          description: "Unexpected error occurred",
        });
      }
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeApi.deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee deleted successfully.");
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error("Error deleting employee", {
          description:
            error.response?.data?.message ||
            error.response?.data?.detail ||
            error.message,
        });
      } else {
        toast.error("Error deleting employee", {
          description: "Unexpected error occurred",
        });
      }
    },
  });
};
