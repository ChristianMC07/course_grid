'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Grid } from '@/tools/data.model';
import { thisCourseGrids } from '@/actions/thisUserGrids';
import { archiveGrid } from '@/actions/archiveGrid'; // Ensure you have this action implemented

interface GridsPageProps {
  params: {
    id: string;
  };
}

const GridsPage: React.FC<GridsPageProps> = ({ params }) => {
  const [userGrids, setUserGrids] = useState<Grid[]>([]);

  useEffect(() => {
    const fetchAndSetUserGrids = async () => {
      const grids = await thisCourseGrids(params.id);
      setUserGrids(grids || []);
    };

    fetchAndSetUserGrids();
  }, [params.id]);

  const handleArchiveGrid = async (gridIndex: number) => {
    // Optionally, confirm with the user
    const confirmed = window.confirm("Are you sure you want to archive this grid?");
    if (confirmed) {
      const success = await archiveGrid(params.id, gridIndex);
      if (success) {
        alert("Grid successfully archived.");
        // Optionally, update the UI to reflect the change
        const updatedGrids = userGrids.filter((_, index) => index !== gridIndex);
        setUserGrids(updatedGrids);
      } else {
        alert("Failed to archive the grid.");
      }
    }
  };

  return (
<div className="min-h-[85vh] bg-gray-100 px-10 pt-10">
  <div className="mb-10">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">{params.id} - Grids</h1>
      <Link href={`/home/courses/${params.id}/grids/create`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        + Add Grid
      </Link>
    </div>
  </div>
  <main className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {userGrids ? (
      userGrids.map((grid, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
          <div className="p-5">
            <h2 className="text-xl font-bold text-gray-800">{grid.gridName}</h2>
            <p>Weeks: {grid.weeks?.length}</p>
          </div>
          <div className='flex justify-between items-center p-4 bg-gray-100'>
            {/* View button */}
            <Link href={`/home/courses/${params.id}/grids/${index}/view`} className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded transition duration-300">
              View
            </Link>
            
            {/* Container for other buttons */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-end gap-2">

                <Link href={`/home/courses/${params.id}/grids/${index}/duplicate`} className="text-green-500 hover:text-green-700 transition-colors duration-300 px-3 py-1 rounded border border-green-500 hover:border-green-700">
                  Duplicate
                </Link>
                <button
                    onClick={() => handleArchiveGrid(index)}
                    className="text-yellow-500 hover:text-yellow-700 transition-colors duration-300 px-3 py-1 rounded border border-yellow-500 hover:border-yellow-700"
                    >
                    Archive
                    </button>
              </div>
              <div className="flex justify-end gap-2">
                
                <Link href={`/home/courses/${params.id}/grids/${index}/edit`} className="text-blue-500 hover:text-blue-700 transition-colors duration-300 px-3 py-1 rounded border border-blue-500 hover:border-blue-700">
                  Edit
                </Link>
                <Link href={`/home/courses/${params.id}/grids/${index}/delete`} className="text-red-500 hover:text-red-700 transition-colors duration-300 px-3 py-1 rounded border border-red-500 hover:border-red-700">
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-10">
        <p className="text-gray-600">Looks like you have no grids yet.</p>
      </div>
    )}
  </main>
</div>

  );
};

export default GridsPage;
