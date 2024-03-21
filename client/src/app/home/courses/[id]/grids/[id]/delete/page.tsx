'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchGrid } from '@/actions/fetchGrid'; // Make sure to implement this function
import { deleteGrid } from '@/actions/deleteGrid'; // Adjust according to your actual action
import SpinnerLoading from "@/app/loading";
import { Grid } from '@/tools/data.model'; // Adjust with your actual Grid model

const DeleteGridPage = ({ gridId }) => {
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

  const handleDelete = async () => {
    const result = await deleteGrid(gridId); // Adjust with your actual action
    if (result) {
      window.location.href = `/home/courses/${gridData?.courseID}/grids`; // Adjust redirection as needed
    } else {
      alert("Failed to delete the grid");
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (!gridData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Are you sure you want to delete this grid?</h1>
        {/* Include additional grid information if needed */}
        <div className="flex items-center justify-between">
          <button onClick={handleDelete} className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Delete
          </button>
          <Link href={`/home/courses/${gridData.courseID}/grids`} className="font-bold text-sm text-blue-500 hover:text-blue-800">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteGridPage;
