import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import Select from "react-select";

const inputClass =
  "w-full h-11 border border-gray-400 rounded-md px-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

const textareaClass =
  "w-full min-h-[100px] border border-gray-400 rounded-md px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    height: "44px",
    minHeight: "44px",
    borderRadius: "6px",
    border: "1px solid #9ca3af",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(99,102,241,0.5)" : "none",
    "&:hover": { borderColor: "#6b7280" },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#6b7280",
    fontSize: "14px",
  }),
};

const Employeeform = () => {

  const skillOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "aws", label: "AWS/Cloud" },
    { value: "management", label: "Management" },
  ];

  const TanStackSelect = ({ field, options, placeholder }) => {
    return (
      <Select
        isMulti
        value={field.state.value || []}
        onChange={field.handleChange}
        onBlur={field.handleBlur}
        options={options}
        placeholder={placeholder}
        className="w-full"
        styles={selectStyles}
      />
    );
  };

  const [employees, setEmployees] = useState([]);

  const form = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      age: "",
      gender: "",
      skills: [],
      joiningDate: "",
      description: "",
      emailNotifications: false,
    },
    onSubmit: async ({ value }) => {
      const submittedSkills = value.skills.map((s) => s.value);
      console.log("submitted skills:", submittedSkills);
      console.log("submitted values:", value);
      setEmployees((prev) => [...prev, value]);
    },
  });

  return (
    <div className="pt-3">
      {/* FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className=""
      >
        <h2 className="text-xl text-center text-gray-700 font-semibold">
          EMPLOYEE FORM
        </h2>
        <p className="text-sm/6 text-gray-400 text-center mb-5">
          This information will be displayed publicly so be careful what you
          share.
        </p>

        {/* MAIN FORM CONTAINER CENTERED */}
        <div className="flex flex-col gap-5 w-[500px] mx-auto">
          {/* FIRST AND LAST NAME */}
          <div className="flex gap-5">
            <div className="flex-1 text-sm/6">
              <label>First Name</label>
              <form.Field
                name="firstname"
                children={(field) => (
                  <input
                    className={inputClass}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </div>

            <div className="flex-1 text-sm/6">
              <label>Last Name</label>
              <form.Field
                name="lastname"
                children={(field) => (
                  <input
                    className={inputClass}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>

          {/* AGE & GENDER */}
          <div className="flex gap-5">
            <div className="flex-1 text-sm/6">
              <label>Age</label>
              <form.Field
                name="age"
                children={(field) => (
                  <input
                    type="number"
                    className={inputClass}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                )}
              />
            </div>

            <div className="flex-1 text-sm/6">
              <label>Gender</label>
              <form.Field
                name="gender"
                children={(field) => (
                  <select
                    className={inputClass}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                )}
              />
            </div>
          </div>

          {/* MULTI SELECT SKILLS */}
          <div className="text-sm/6">
            <label>Select Skills</label>
            <form.Field
              name="skills"
              children={(field) => (
                <div>
                  <TanStackSelect
                    field={field}
                    options={skillOptions}
                    placeholder="Select skills..."
                  />

                  {/* Errors */}
                  {field.state.meta.errors && (
                    <em className="text-red-500 text-sm block mt-1">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              )}
            />
          </div>

          {/* JOINING DATE */}
          <div className="text-sm/6">
            <label>Joining Date</label>
            <form.Field
              name="joiningDate"
              children={(field) => (
                <input
                  type="date"
                  className={inputClass}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </div>

          {/* DESCRIPTION TEXTAREA 👇 */}
          <div className="text-sm/6">
            <label>Description</label>
            <form.Field
              name="description"
              children={(field) => (
                <textarea
                  className={textareaClass}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Write something about the employee..."
                ></textarea>
              )}
            />
          </div>

          {/* SWITCH */}
          <div className="text-sm/6">
            <form.Field
              name="emailNotifications"
              children={(field) => (
                <div className="flex items-center justify-between w-full">
                  <label className="font-medium text-sm/6">
                    Email Notifications
                  </label>

                  <button
                    type="button"
                    onClick={() => field.handleChange(!field.state.value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition 
                      ${field.state.value ? "bg-indigo-500" : "bg-gray-400"}`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition 
                        ${
                          field.state.value ? "translate-x-5" : "translate-x-0"
                        }`}
                    />
                  </button>
                </div>
              )}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Add Employee
          </button>
        </div>
      </form>

      {/* TABLE HERE IF NEEDED */}
      {/* <Employeetable data={employees} /> */}
    </div>
  );
};

export default Employeeform;
