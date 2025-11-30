import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";

const EmployeeData = () => {
  const [submissions, setSubmissions] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ---------------- FETCH DATA ----------------
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        "https://matbookbackend.onrender.com/api/submissions",
        {
          params: { page, limit, sortBy, sortOrder },
        }
      );

      setSubmissions(res.data.data);
      setPageInfo(res.data.pageInfo);
      setTotalCount(res.data.pageInfo.totalItems);
    } catch (err) {
      setError("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, sortBy, sortOrder]);

  // ---------------- COLUMNS ----------------
  const columns = [
    {
      header: "Submission ID",
      accessorKey: "submissionId",
      meta: { width: "200px" },
    },
    {
      header: (
        <div
          className="cursor-pointer select-none"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Created At {sortOrder === "asc" ? "↑" : "↓"}
        </div>
      ),
      accessorKey: "createdAt",
      cell: (info) => new Date(info.getValue()).toLocaleDateString("en-IN"),
      meta: { width: "200px" },
    },
    {
      header: "Full Name",
      accessorKey: "fullName",
      meta: { width: "200px" },
    },
    {
      header: "View",
      accessorKey: "view",
      cell: (info) => (
        <button
          onClick={() => handleView(info.row.original)}
          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          View
        </button>
      ),
      meta: { width: "100px" },
    },
    // {
    //   header: "Skills",
    //   accessorKey: "skills",
    //   cell: (info) =>
    //     (info.getValue() || []).map((skill, i) => {
    //       const label = typeof skill === "string" ? skill : skill.label;
    //       return (
    //         <span
    //           key={i}
    //           className="px-2 py-1 bg-gray-200 rounded text-xs mr-1"
    //         >
    //           {label}
    //         </span>
    //       );
    //     }),
    // },
    // {
    //   header: "Joining Date",
    //   accessorKey: "joinDate",
    // },
    // {
    //   header: "Active",
    //   accessorKey: "isActive",
    //   cell: (info) => (
    //     <span
    //       className={`px-2 py-1 rounded text-white ${
    //         info.getValue() ? "bg-green-500" : "bg-red-500"
    //       }`}
    //     >
    //       {info.getValue() ? "Active" : "Inactive"}
    //     </span>
    //   ),
    // },
  ];

  const handleView = (row) => {
    setSelectedRow(row);
    setShowModal(true); // open modal
    // setShowDrawer(true);  // open drawer
  };

  // ---------------- TABLE ----------------
  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // ---------------- UI STATES ----------------
  if (loading) {
    return (
      <div className="text-center mt-6 text-lg font-semibold">
        Loading submissions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-6 text-lg text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (!submissions.length) {
    return (
      <div className="text-center mt-6 text-gray-600 text-lg">
        No submissions found.
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* TOTAL COUNT */}
      {/* <div className="text-lg font-semibold mb-3">
        Total Submissions: {totalCount}
      </div> */}

      {/* BEAUTIFUL TABLE */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-sm font-semibold border-b border-gray-200 text-center"
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

          <tbody className="text-gray-700">
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`
                  ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  hover:bg-indigo-50 transition-colors
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 border-b border-gray-200 text-sm text-center"
                    style={{ width: cell.column.columnDef.meta?.width }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION CONTROLS */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-3 align-center">
          <select
            className="border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setPage(1);
            }}
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
          </select>
          <div className="text-sm text-gray-600 mt-2 text-center italic">
            Items {Math.min(page * limit, totalCount)} of {totalCount}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 mt-2 text-center italic">
            Page {pageInfo.currentPage} of {pageInfo.totalPages}
          </span>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-300 hover:bg-indigo-700 transition"
            disabled={!pageInfo.hasPrevPage}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-300 hover:bg-indigo-700 transition"
            disabled={!pageInfo.hasNextPage}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* ---------------- VIEW MODAL ---------------- */}
      {showModal && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative animate-fadeIn">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              Employee Details
            </h2>

            <div className="space-y-3 text-gray-800">
              <p>
                <strong>ID:</strong> {selectedRow.submissionId}
              </p>

              <p>
                <strong>Full Name:</strong> {selectedRow.fullName}
              </p>

              <p>
                <strong>Age:</strong> {selectedRow.age}
              </p>

              <p>
                <strong>Gender:</strong> {selectedRow.gender}
              </p>

              <p>
                <strong>Joining Date:</strong> {selectedRow.joinDate}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    selectedRow.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {selectedRow.isActive ? "Active" : "Inactive"}
                </span>
              </p>

              <div>
                <strong>Skills:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedRow.skills?.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-200 rounded text-xs"
                    >
                      {typeof s === "string" ? s : s.label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong>Bio:</strong>
                <p className="bg-gray-100 p-2 rounded text-sm mt-1">
                  {selectedRow.bio || "No bio provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeData;
