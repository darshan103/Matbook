import React from "react";
import { useForm } from "@tanstack/react-form";

const EmployeeForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      age: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Submitted:", value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {/* Name Field */}
      <form.Field
        name="name"
        children={(field) => (
          <div>
            <label>Name *</label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Enter name"
            />
            {field.state.meta.touchedErrors && (
              <div className="text-red-500">
                {field.state.meta.touchedErrors}
              </div>
            )}
          </div>
        )}
      />

      {/* Age Field */}
      <form.Field
        name="age"
        children={(field) => (
          <div>
            <label>Age *</label>
            <input
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              onBlur={field.handleBlur}
              placeholder="Enter age"
            />
            {field.state.meta.touchedErrors && (
              <div className="text-red-500">
                {field.state.meta.touchedErrors}
              </div>
            )}
          </div>
        )}
      />

      <button type="submit" disabled={form.state.isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default EmployeeForm;
