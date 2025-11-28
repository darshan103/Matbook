import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import Employeetable from "./Employeetable";

const EmployeeForm = () => {
  const [employees, setEmployees] = useState([]);

  const form = useForm({
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      skills: [],
      joiningDate: "",
      description: "",
      isActive: false,
    },
    onSubmit: async ({ value }) => {
      setEmployees((prev) => [...prev, value]); // add new row to table
    },
  });

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Employee Form</h2>

      {/* FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* TEXT FIELD */}
        <form.Field
          name="name"
          children={(field) => (
            <div>
              <label>Name</label>
              <input
                className="border p-2 w-full"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* NUMBER FIELD */}
        <form.Field
          name="age"
          children={(field) => (
            <div>
              <label>Age</label>
              <input
                type="number"
                className="border p-2 w-full"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </div>
          )}
        />

        {/* SELECT FIELD */}
        <form.Field
          name="gender"
          children={(field) => (
            <div>
              <label>Gender</label>
              <select
                className="border p-2 w-full"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          )}
        />

        {/* MULTI SELECT */}
        <form.Field
          name="skills"
          children={(field) => (
            <div>
              <label>Skills</label>
              <select
                multiple
                className="border p-2 w-full"
                value={field.state.value}
                onChange={(e) => {
                  const selected = Array.from(
                    e.target.selectedOptions,
                    (opt) => opt.value
                  );
                  field.handleChange(selected);
                }}
              >
                <option value="react">React</option>
                <option value="angular">Angular</option>
                <option value="node">Node</option>
                <option value="sql">SQL</option>
              </select>
            </div>
          )}
        />

        {/* DATE FIELD */}
        <form.Field
          name="joiningDate"
          children={(field) => (
            <div>
              <label>Joining Date</label>
              <input
                type="date"
                className="border p-2 w-full"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* SWITCH */}
        <form.Field
          name="isActive"
          children={(field) => (
            <div className="flex gap-2 items-center">
              <label>Active</label>
              <input
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
              />
            </div>
          )}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Employee
        </button>
      </form>

      {/* TABLE */}
      <Employeetable data={employees} />
    </div>
  );
};

export default EmployeeForm;
