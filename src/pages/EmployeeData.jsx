import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";

export const fetchSubmissions = async () => {
  console.log("Fetch Submissions");
  const res = await axios.get("/api/submissions");
  return res.data;
};

const EmployeeData = ({ data = [] }) => {
  const [submissions, setSubmissions] = useState([]);
  const columns = [
    {
      header: "SubmissionId",
      accessorKey: "submissionId",
      meta: { width: "400px" },
    },
    {
      header: "CreatedAt",
      accessorKey: "createdAt",
      meta: { width: "300px" },
    },
    {
      header: "FullName",
      accessorKey: "fullName",
    },
    {
      header: "Skills",
      accessorKey: "skills",
      cell: (info) => {
        const skills = info.getValue() || [];

        return skills.map((skill, i) => {
          const label = typeof skill === "string" ? skill : skill.label; // FIX

          return (
            <span
              key={i}
              style={{
                padding: "2px 6px",
                marginRight: "4px",
                background: "#e5e7eb",
                borderRadius: "4px",
              }}
            >
              {label}
            </span>
          );
        });
      },
    },
    {
      header: "JoiningDate",
      accessorKey: "joinDate",
    },
    {
      header: "Active",
      accessorKey: "isActive",
      cell: (info) => (info.getValue() ? "Active" : "Inactive"),
    },
  ];

  useEffect(()=>{
    const load = async () => {
      const result = await fetchSubmissions();
      console.log("Fetched Data:", result);
      setSubmissions(result);
    };
    load();
  },[])
  
  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className="w-full border mt-6">
      <thead className="bg-gray-200">
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => (
              <th
                key={header.id}
                className="p-2 border"
                style={{ width: header.column.columnDef.meta?.width }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="p-2 border text-center"
                style={{ width: cell.column.columnDef.meta?.width }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeData;
