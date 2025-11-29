import React from "react";
import { useForm } from "@tanstack/react-form";
import Select from "react-select";
import { FaArrowRight } from "react-icons/fa";

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

const Employeeform = ({ schema }) => {
  
  // f = schema array (shortcut)
  const f = schema.fields;
  console.log("schema f:", f);

  // multi-select options
  const skillOptions = f[3].options.map((item) => ({
    value: item,
    label: item,
  }));

  const TanStackSelect = ({ field, options, placeholder }) => (
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

  // Default values based on schema names
  const form = useForm({
    defaultValues: {
      fullName: "",
      age: "",
      gender: "",
      skills: [],
      joinDate: "",
      bio: "",
      isActive: false,
    },
    onSubmit: ({ value }) => {
      console.log("Submitted:", value);
    },
  });

  return (
    <div className="pt-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <h2 className="text-xl text-center text-gray-700 font-semibold">
          EMPLOYEE FORM
        </h2>

        <div className="flex flex-col gap-5 w-[500px] mx-auto">
          {/* FULL NAME */}
          <div className="text-sm/6">
            <label>
              {f[0].label} <span className="text-red-500 item-center">*</span>
            </label>
            <form.Field
              name="fullName"
              validators={{
                onChange: ({ value }) =>
                  value < f[0].validations.minLength
                    ? "Min 3 characters is required"
                    : "",
              }}
            >
              {(field) => (
                <>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder={f[0].placeholder}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  {!field.state.meta.isValid && field.state.meta.errors ? (
                    <p className="text-red-500 text-xs italic mt-1">
                      {field.state.meta.errors}
                    </p>
                  ) : null}
                </>
              )}
            </form.Field>
          </div>

          {/* AGE + GENDER */}
          <div className="flex gap-5">
            {/* AGE */}
            <div className="flex-1 text-sm/6">
              <label>
                {f[1].label}
                <span className="text-red-500 item-center">*</span>
              </label>
              <form.Field
                name="age"
                validators={{
                  onChange: ({ value }) => {
                    const rules = f[1].validations; // <-- age validations

                    if (!value) return "Age is required";

                    if (rules.min && value < rules.min)
                      return `Age must be at least ${rules.min}`;

                    if (rules.max && value > rules.max)
                      return `Age must be below ${rules.max}`;

                    return "";
                  },
                }}
              >
                {(field) => (
                  <>
                    <input
                      type="number"
                      className={inputClass}
                      placeholder="Enter age"
                      min={f[1].min}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />

                    {!field.state.meta.isValid && field.state.meta.errors ? (
                      <p className="text-red-500 text-xs italic mt-1">
                        {field.state.meta.errors}
                      </p>
                    ) : null}
                  </>
                )}
              </form.Field>
            </div>

            {/* GENDER */}
            <div className="flex-1 text-sm/6">
              <label>
                {f[2].label}
                <span className="text-red-500 item-center">*</span>
              </label>
              <form.Field
                name="gender"
                validators={{
                  onChange: ({ value }) => (!value ? "Gender is required" : ""),
                }}
              >
                {(field) => (
                  <>
                    <select
                      className={inputClass}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <option value="">Select</option>
                      {f[2].options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {!field.state.meta.isValid && field.state.meta.errors ? (
                      <p className="text-red-500 text-xs italic mt-1">
                        {field.state.meta.errors}
                      </p>
                    ) : null}
                  </>
                )}
              </form.Field>
            </div>
          </div>

          {/* SKILLS */}
          <div className="text-sm/6">
            <label>
              {f[3].label}
              <span className="text-red-500 item-center">*</span>
            </label>
            <form.Field
              name="skills"
              validators={{
                onChange: ({ value }) => {
                  const v = f[3].validations; // ⬅️ minSelected & maxSelected rules

                  if (v.minSelected && value.length < v.minSelected) {
                    return `Select at least ${v.minSelected} skill(s)`;
                  }

                  if (v.maxSelected && value.length > v.maxSelected) {
                    return `You can select maximum ${v.maxSelected} skill(s)`;
                  }

                  return "";
                },
              }}
            >
              {(field) => (
                <>
                  <TanStackSelect
                    field={field}
                    options={skillOptions}
                    placeholder="Select skills..."
                  />
                  {!field.state.meta.isValid && field.state.meta.errors ? (
                    <p className="text-red-500 text-xs italic mt-1">
                      {field.state.meta.errors}
                    </p>
                  ) : null}
                </>
              )}
            </form.Field>
          </div>

          {/* JOIN DATE */}
          <div className="text-sm/6">
            <label>
              {f[4].label}
              <span className="text-red-500 item-center">*</span>
            </label>
            <form.Field
              name="joinDate"
              validators={{
                onChange: ({ value }) => {
                  const v = f[4].validations;
                  const minDate = v.minDate;

                  if (!value) {
                    return "Joining Date is required";
                  }

                  // Convert to comparable Date objects
                  if (minDate && new Date(value) < new Date(minDate)) {
                    return `${f[4].label} cannot be earlier than ${minDate}`;
                  }

                  return "";
                },
              }}
            >
              {(field) => (
                <>
                  <input
                    type="date"
                    className={inputClass}
                    min={f[4].minDate}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && field.state.meta.errors ? (
                    <p className="text-red-500 text-xs italic mt-1">
                      {field.state.meta.errors}
                    </p>
                  ) : null}
                </>
              )}
            </form.Field>
          </div>

          {/* BIO */}
          <div className="text-sm/6">
            <label>
              {f[5].label}
              <span className="text-red-500 item-center">*</span>
            </label>
            <form.Field
              name="bio"
              validators={{
                onChange: ({ value }) => (!value ? "Bio is required" : ""),
              }}
            >
              {(field) => (
                <>
                  <textarea
                    className={textareaClass}
                    placeholder={f[5].placeholder}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  ></textarea>

                  {!field.state.meta.isValid && field.state.meta.errors ? (
                    <p className="text-red-500 text-xs italic mt-1">
                      {field.state.meta.errors}
                    </p>
                  ) : null}
                </>
              )}
            </form.Field>
          </div>

          {/* SWITCH */}
          <div className="flex justify-between items-center text-sm/6">
            <div className="flex gap-3 flex-1">
              <label>{f[6].label}</label>
              <form.Field
                name="isActive"
                children={(field) => (
                  <button
                    type="button"
                    onClick={() => field.handleChange(!field.state.value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      field.state.value ? "bg-indigo-500" : "bg-gray-400"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                        field.state.value ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                )}
              />
            </div>
            <div className="flex-1 flex items-center justify-end">
              <button
                type="submit"
                className="flex items-center justify-between gap-2 bg-indigo-600 text-white p-2 rounded w-2/3"
              >
                <span>Add Employee</span>
                <FaArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Employeeform;
