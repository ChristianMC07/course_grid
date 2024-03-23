// Adjust the path for fetchGrid and deleteGrid imports as necessary
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchGrid } from '@/actions/fetchGrids';
import { deleteGrid } from '@/actions/deleteGrid';
import SpinnerLoading from "@/app/loading";
import { Grid } from '@/tools/data.model';

const DeleteGridPage = () => {
  const [gridData, setGridData] = useState<Grid | null>(null);
  const [courseId, setCourseId] = useState<string>('');
  const [gridIndex, setGridIndex] = useState<number>(0);
  const [weeksCount, setWeeksCount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Adapt to fetch grid data based on courseId and gridIndex from the URL
    const urlParts = window.location.pathname.split('/');
    const courseID = urlParts[urlParts.length - 4];
    const index = parseInt(urlParts[urlParts.length - 2]);
    setCourseId(courseID);
    setGridIndex(index);
  
    const loadGridData = async () => {
      const grid = await fetchGrid(courseID, index);
      if (grid) {
        setGridData(grid);
        // Check if weeks exists and is an array before attempting to access its length
        setWeeksCount(grid.weeks ? grid.weeks.length : 0);
        setIsLoading(false);
      }
    };
  
    loadGridData();
  }, []);

  const handleDelete = async () => {
    const result = await deleteGrid(courseId, gridIndex);
    if (result.success) {
      alert(`Successfully deleted the grid with ${result.weeksCount} weeks.`);
      // Handle successful deletion, e.g., redirecting
      window.location.href = `/home/courses/${courseId}/grids`;
    } else {
      alert("Failed to delete the grid");
    }
  };

  if (isLoading || !gridData) {
    return <SpinnerLoading />;
  }


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Are you sure you want to delete this grid?</h1>
        {gridData && (
          <>
            <p className="mb-4">Grid: {gridData.gridName} - This will also delete {weeksCount} weeks.</p>
            <div className="flex items-center justify-between">
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Delete
              </button>
              <Link href={`/home/courses/${courseId}/grids`} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Cancel
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteGridPage;
