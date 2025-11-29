import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";

const EmployeeData = () => {
  const [submissions, setSubmissions] = useState([]); // FIX
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // items per page
  const [sort, setSort] = useState("desc"); // asc | desc

  // ---------------- FETCH DATA ----------------
  const fetchData = async () => {
    const res = await axios.get("/api/submissions", {
      params: { page, limit, sort },
    });

    setSubmissions(res.data.data); // FIX
    setPageInfo(res.data.pageInfo);
  };

  // eslint-disable-next-line
  useEffect(() => {
    fetchData();
  }, [page, limit, sort]);

  // ---------------- COLUMNS ----------------
  const columns = [
    {
      header: "SubmissionId",
      accessorKey: "submissionId",
      meta: { width: "200px" },
    },
    {
      header: (
        <div
          className="cursor-pointer select-none"
          onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
        >
          CreatedAt {sort === "asc" ? "↑" : "↓"}
        </div>
      ),
      accessorKey: "createdAt",
      cell: (info) => new Date(info.getValue()).toLocaleString("en-IN"),
      meta: { width: "200px" },
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
          const label = typeof skill === "string" ? skill : skill.label;

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

  // ---------------- TABLE ----------------
  const table = useReactTable({
    data: submissions, // FIX
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {/* TABLE */}
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
                  {flexRender(
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

      {/* PAGINATION CONTROLS */}
      <div className="flex items-center justify-between mt-4">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:bg-gray-200"
          disabled={!pageInfo.hasPrevPage}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {pageInfo.currentPage} of {pageInfo.totalPages}
        </span>

        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:bg-gray-200"
          disabled={!pageInfo.hasNextPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* ITEMS PER PAGE */}
      <div className="mt-3">
        <select
          className="border p-2"
          value={limit}
          onChange={(e) => {
            setLimit(parseInt(e.target.value));
            setPage(1); // reset to first page
          }}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
        </select>
      </div>
    </div>
  );
};

export default EmployeeData;
