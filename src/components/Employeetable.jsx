import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const Employeetable = ({ data }) => {
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Age",
      accessorKey: "age",
    },
    {
      header: "Gender",
      accessorKey: "gender",
    },
    {
      header: "Skills",
      accessorKey: "skills",
      cell: (info) =>
        info.getValue().map((skill) => (
          <span
            key={skill}
            style={{
              padding: "2px 6px",
              marginRight: "4px",
              background: "#e5e7eb",
              borderRadius: "4px",
            }}
          >
            {skill}
          </span>
        )),
    },
    {
      header: "Joining Date",
      accessorKey: "joiningDate",
    },
    {
      header: "Active",
      accessorKey: "isActive",
      cell: (info) => (info.getValue() ? "Active" : "Inactive"),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border mt-6">
      <thead className="bg-gray-200">
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => (
              <th key={header.id} className="p-2 border">
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
              <td key={cell.id} className="p-2 border">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Employeetable;
