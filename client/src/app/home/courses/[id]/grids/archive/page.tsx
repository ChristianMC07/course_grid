'use client'; // Add this to signal a Client Component in Next.js

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { thisCourseArchivedGrids } from '@/actions/thisCourseArchivedGrids';
import SpinnerLoading from "@/app/loading"; // Ensure this is suitable for your setup
import { Grid } from '@/tools/data.model';
import { deleteArchivedGrid } from '@/actions/deleteArchivedGrid'; // Adjust the path as necessary


// Simple formatDate function using toLocaleDateString for demonstration
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    // Here's a simple formatting. You might want to customize it.
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

interface ArchivePageProps {
  params: {
    id: string;
  };
}

const ArchivePage: React.FC<ArchivePageProps> = ({ params }) => {
    const [archivedGrids, setArchivedGrids] = useState<Grid[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchArchivedGrids = async () => {
        const grids = await thisCourseArchivedGrids(params.id);
        setArchivedGrids(grids || []);
        setIsLoading(false);
      };
      fetchArchivedGrids();
    }, [params.id]);

    const handleDeleteArchivedGrid = async (gridIndex: number) => {
      // Optionally, confirm with the user before deleting
      const confirmed = window.confirm("Are you sure you want to delete this archived grid?");
      if (confirmed) {
          const success = await deleteArchivedGrid(params.id, gridIndex);
          if (success) {
              alert("Grid successfully deleted.");
              // Update UI by removing the deleted grid
              const updatedGrids = archivedGrids.filter((_, index) => index !== gridIndex);
              setArchivedGrids(updatedGrids);
          } else {
              alert("Failed to delete the grid.");
          }
      }
  };
  
    if (isLoading) {
      return <SpinnerLoading />;
    }
  
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-xl font-bold mb-4">Archived Grids for {params.id}</h1>
          {archivedGrids.length > 0 ? (
            archivedGrids.map((grid, index) => (
              <div key={index} className="mb-4">
                <h2 className="text-lg font-bold">{grid.gridName}</h2>
                <p>Weeks: {grid.weeks?.length || 0}</p>
                <p>Archived on: {grid.archivedAt ? formatDate(grid.archivedAt) : 'N/A'}</p>
                <Link href={`/home/courses/${params.id}/grids/archive/${index}/view`} className="text-blue-500 hover:text-blue-700">View Details</Link>
                <button
                    onClick={() => handleDeleteArchivedGrid(index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-300 px-3 mx-2 py-1 rounded border border-red-500 hover:border-red-700">
                    Delete
                </button>
              </div>
            ))
          ) : (
            <p>No archived grids found.</p>
          )}
          <Link href={`/home/courses/${params.id}/grids`} className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to Grids
          </Link>
        </div>
      </div>
    );
  };
  
  export default ArchivePage;