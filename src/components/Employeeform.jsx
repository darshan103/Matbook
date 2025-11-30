import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import Select from "react-select";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

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

    onSubmit: async ({ value, formApi }) => {
      try {
        console.log("Submitted:", value);
        setMessage("");
        setStatus("");

        // Fake Delay
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // Axios POST
        const res = await axios.post("https://matbookbackend.onrender.com/api/submissions", value);

        const result = res.data;
        if (!result.success) {
          setMessage("Validation error!");
          setStatus("error");
          console.log("Server validation:", result.errors);
          return;
        }

        // Show success message
        setMessage("Form submitted successfully!");
        setStatus("success");

        // RESET FORM
        formApi.reset();

        // REDIRECT AFTER 1 sec
        setTimeout(
          () => navigate("https://matbookbackend.onrender.com/api/submissions"),
          1000
        );

      } catch (error) {

        // Validation error
        if (error.response?.data?.errors) {
          setMessage("Validation error!");
          setStatus("error");

          console.log("Server validation:", error.response.data.errors);
          return;
        }

        // Server error
        setMessage("Something went wrong!");
        setStatus("error");
      }
    },
  });

  return (
    <div className="pt-3">
      {/* SUCCESS | ERROR */}
      {message ? (
        <div
          className={`p-2 rounded text-center mb-4 font-medium ${
            status === "success"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await form.handleSubmit();
            await new Promise((res) => setTimeout(res, 1000));
            setLoading(false);
          }}
        >
          <h2 className="text-xl text-center text-gray-700 font-semibold">
            {schema.title}
          </h2>
          <p className="text-sm text-center text-gray-500">
            {schema.description}
          </p>

          <div className="flex flex-col gap-5 w-[500px] mx-auto">
            {/* FULL NAME */}
            <div className="text-sm/6">
              <label>
                {f[0].label} <span className="text-red-500 item-center">*</span>
              </label>
              <form.Field
                name="fullName"
                validators={{
                  // onChange: ({ value }) =>
                  //   value < f[0].validations.minLength
                  //     ? "Min 3 characters is required"
                  //     : "",
                  onChange: ({ value }) => {
                    const rules = f[0].validations;

                    if (!value) return "Fullname is required";

                    if (rules.minLength && value < rules.minLength)
                      return `Min ${rules.minLength} characters is required`;

                    if (rules.maxLength && value > rules.maxLength)
                      return `Max ${rules.maxLength} characters is required`;

                    return "";
                  },
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
                      const rules = f[1].validations;

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
                    onChange: ({ value }) =>
                      !value ? "Gender is required" : "",
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
                    const v = f[3].validations;

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
                      placeholder="Select Skills"
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
                      <p className="text-red-500 text-xs italic">
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
                  disabled={loading}
                  className={`flex items-center justify-between gap-2 bg-indigo-600 text-white p-2 rounded w-2/3
                  ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center w-full">
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <span>Add Employee</span>
                      <FaArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Employeeform;
