import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import {
  attendanceSchema,
  type AttendanceFormData,
} from "../../types/attendance";
import { useMarkAttendance } from "../../hooks/useAttendance";
import { useEmployees } from "../../hooks/useEmployees";
import type { Employee } from "../../types/employee";
import { cn } from "../../lib/utils";

export default function MarkAttendanceForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<AttendanceFormData>({
    resolver: zodResolver(attendanceSchema),
    mode: "onChange",
    defaultValues: {
      employee_id: "",
      date: "",
      status: undefined,
    },
  });

  const { mutate, isPending } = useMarkAttendance();
  const { data, isLoading } = useEmployees();
  const employees = data?.results || [];

  // ensure status is registered for validation and state tracking
  register("status");

  const selectedStatus = watch("status");

  const handleStatusChange = (value: "present" | "absent") => {
    setValue("status", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!selectedStatus) return;

    if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      handleStatusChange(selectedStatus === "present" ? "absent" : "present");
    }
  };

  const onSubmit = (data: AttendanceFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset(); // resets everything cleanly
      },
    });
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold">Mark Attendance</h2>
      <p className="text-gray-500 text-sm mb-4">
        Record daily attendance for an employee.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Employee */}
        <div className="flex flex-col gap-1">
          <label htmlFor="employee_id" className="text-sm text-gray-600">
            Employee
          </label>

          <select
            id="employee_id"
            {...register("employee_id")}
            disabled={isLoading}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">
              {isLoading ? "Loading..." : "Select employee"}
            </option>

            {employees?.map((emp: Employee) => (
              <option
                key={emp?.employee_id}
                value={emp?.employee_id}
                className="capitalize"
              >
                {`(${emp?.employee_id}) ${
                  emp?.full_name?.charAt(0).toUpperCase() +
                  emp?.full_name?.slice(1)
                }`}
              </option>
            ))}
          </select>

          {errors.employee_id && (
            <p className="text-red-500 text-sm">{errors.employee_id.message}</p>
          )}
        </div>

        {/* Date */}
        <Input type="date" label="Date" {...register("date")} />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}

        {/* Status (Accessible Toggle) */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Status</label>

          <div
            role="radiogroup"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="flex gap-2"
          >
            {["present", "absent"].map((status) => {
              const isActive = selectedStatus === status;

              return (
                <Button
                  key={status}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() =>
                    handleStatusChange(status as "present" | "absent")
                  }
                  className={cn(
                    "px-4 py-2 rounded-lg border focus-visible:ring-2 w-full capitalize",
                    isActive
                      ? status === "present"
                        ? "bg-green-500 hover:bg-green-400"
                        : "bg-red-500 hover:bg-red-400"
                      : status === "present"
                      ? "bg-green-200 hover:bg-green-300 border[.8px] border-green-500 text-green-600!"
                      : "bg-red-200 hover:bg-red-300 border[.8px] border-red-500 text-red-600!"
                  )}
                >
                  {status}
                </Button>
              );
            })}
          </div>

          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending || !isValid || !isDirty}
          className="bg-green-500 hover:bg-green-400"
        >
          {isPending ? "Marking..." : "Mark Attendance"}
        </Button>
      </form>
    </Card>
  );
}
