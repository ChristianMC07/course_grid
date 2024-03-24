'use client'; // Add this to signal a Client Component in Next.js

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { thisCourseArchivedGrids } from '@/actions/thisCourseArchivedGrids';
import SpinnerLoading from "@/app/loading"; // Ensure this is suitable for your setup
import { Grid } from '@/tools/data.model';

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