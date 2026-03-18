import type { Employee } from "../types/employee";
import { api } from "./axios";

export const employeeApi = {
  getEmployees: async (page = 1, pageSize = 20) => {
    const res = await api.get(`/employees?page=${page}&page_size=${pageSize}`);
    return res.data?.data || { results: [], pagination: {} };
  },

  addEmployee: async (data: Employee) => {
    const res = await api.post("/employees", data);
    return res.data;
  },

  deleteEmployee: async (id: string) => {
    const res = await api.delete(`/employees/${id}`);
    return res.data;
  },
};