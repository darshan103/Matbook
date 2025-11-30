import React from 'react'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Employeeform from '../components/Employeeform';

export const fetchFormSchema = async () => {
  console.log("console hit API");
  const res = await axios.get("https://matbookbackend.onrender.com/api/form-schema");
  return res.data;
};

const EmployeePage = () => {
    const {
      data: schema,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["form-schema"],
      queryFn: fetchFormSchema,
    });

   if (isLoading) {
     return (
       <div className="flex justify-center">
         <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 text-center">
           <p className="text-gray-600">Loading form...</p>
         </div>
       </div>
     );
   }

    if (isError) {
      return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Failed to load form
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            {error?.message || "Something went wrong"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-md bg-red-600 text-white text-sm"
          >
            Retry
          </button>
        </div>
      );
    }

  return (
    <>
      <Employeeform schema={schema} />
    </>
  );
}

export default EmployeePage