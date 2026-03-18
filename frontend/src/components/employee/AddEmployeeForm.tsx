import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { employeeSchema, type EmployeeFormData } from "../../types/employee";
import { useAddEmployee } from "../../hooks/useEmployees";

export default function AddEmployeeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    mode: "onChange",
    defaultValues: {
      employee_id: "",
      full_name: "",
      email: "",
      department: "",
    },
  });

  const { mutate, isPending } = useAddEmployee();

  const onSubmit = (data: EmployeeFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  // Reusable field renderer with error handling
  const renderField = (
    name: keyof EmployeeFormData,
    label: string,
    type: string = "text",
    placeholder?: string
  ) => {
    const error = errors[name];

    return (
      <div className="flex flex-col gap-1">
        <Input
          id={name}
          label={label}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          disabled={isPending}
        />

        {error && (
          <p id={`${name}-error`} className="text-red-500 text-sm" role="alert">
            {error.message}
          </p>
        )}
      </div>
    );
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold">Add Employee</h2>
      <p className="text-gray-500 text-sm mb-4">
        Register a new employee in the system.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {renderField("employee_id", "Employee ID", "text", "Enter employee ID (e.g. E123)")}
        {renderField("full_name", "Full Name", "text", "Enter full name (e.g. John Doe)")}
        {renderField("email", "Email Address", "email", "Enter email address (e.g. johndoe@example.com)")}
        {renderField("department", "Department", "text", "Enter department (e.g. Sales)")}

        <Button type="submit" disabled={isPending || !isValid || !isDirty}>
          {isPending ? "Adding..." : "Add Employee"}
        </Button>
      </form>
    </Card>
  );
}
