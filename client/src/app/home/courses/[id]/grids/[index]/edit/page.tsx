// Assuming the URL structure is /home/courses/[courseId]/grids/[gridIndex]/edit
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchGrid } from '@/actions/fetchGrids'; // Adjust the import path as necessary
import { editGrid } from '@/actions/editGrid'; // Adjust the import path as necessary
import SpinnerLoading from "@/app/loading"; // Adjust the import path as necessary
import { Grid } from '@/tools/data.model'; // Adjust the import path as necessary

const EditGridPage = () => {
  const [gridData, setGridData] = useState<Grid | null>(null);
  const [gridIndex, setGridIndex] = useState<number>(0);
  const [courseId, setCourseId] = useState<string>('');
  const [gridName, setGridName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const urlParts = window.location.pathname.split('/');
    const courseID = urlParts[urlParts.length - 4];
    const index = parseInt(urlParts[urlParts.length - 2]);
    setCourseId(courseID);
    setGridIndex(index);

    const loadGridData = async () => {
      const grid = await fetchGrid(courseID, index);
      if (grid) {
        setGridData(grid);
        setGridName(grid.gridName);
        setIsLoading(false);
      }
    };

    loadGridData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('gridName', gridName);
    // Append other grid fields as necessary

    const result = await editGrid(courseId, gridIndex, formData);
    if (result) {
      window.location.href = `/home/courses/${courseId}/grids`;
    } else {
      alert('Failed to update the grid');
    }
  };

  if (isLoading || !gridData) {
    return <SpinnerLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <h1 className="text-xl font-bold">Edit Grid</h1>
          <div>
            <label htmlFor="gridName" className="block text-gray-700 text-sm font-bold mb-2">
              Grid Name
            </label>
            <input
              type="text"
              id="gridName"
              value={gridName}
              onChange={(e) => setGridName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save Changes
            </button>
            <Link href={`/home/courses/${courseId}/grids`} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGridPage;
