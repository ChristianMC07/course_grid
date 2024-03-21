'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchGrid } from '@/actions/fetchGrid'; // Make sure to implement this function
import { editGrid } from '@/actions/editGrid'; // Adjust according to your actual action
import SpinnerLoading from "@/app/loading";
import { Grid } from '@/tools/data.model'; // Adjust with your actual Grid model

const EditGridPage = ({ gridId }) => {
  const [gridData, setGridData] = useState<Grid | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGridData = async () => {
      const grid = await fetchGrid(gridId);
      if (grid) {
        setGridData(grid);
        setIsLoading(false);
      }
    };

    if (gridId) {
      loadGridData();
    }
  }, [gridId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await editGrid(gridId, formData); // Adjust with your actual action
    if (result) {
      window.location.href = `/home/courses/${gridData?.courseID}/grids`; // Adjust redirection as needed
    } else {
      alert("Failed to update the grid");
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (!gridData) {
    return <div>No Grid data</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <form className="space-y-4" onSubmit={handleSubmit} noValidate encType="multipart/form-data">
          <h1 className="text-xl font-bold">Edit Grid</h1>
          {/* Similar form structure as seen in course's edit page */}
          {/* Add input fields for Grid Name, Weeks, etc., as needed */}
          {/* Use gridData to pre-fill form fields */}
          {/* Ensure you handle onChange for form fields to update state */}
          <div className="flex items-center justify-between mt-6">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save Changes
            </button>
            <Link href={`/home/courses/${gridData.courseID}/grids`} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGridPage;
