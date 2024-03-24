// archive/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { thisCourseArchivedGrids } from '@/actions/thisCourseArchivedGrids';
import SpinnerLoading from "@/app/loading"; // Ensure you have a SpinnerLoading component or replace this with your own loading indicator
import { Grid } from '@/tools/data.model';

interface ArchivePageProps {
  params: {
    id: string; // The course ID
  };
}

const ArchivePage: React.FC<ArchivePageProps> = ({ params }) => {
  const [archivedGrids, setArchivedGrids] = useState<Grid[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArchivedGrids = async () => {
      const grids = await thisCourseArchivedGrids(params.id);
      if (grids) {
        setArchivedGrids(grids);
      }
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
            <ul>
                {archivedGrids.map((grid, index) => (
                <li key={index} className="mb-4">
                    <h2 className="text-lg font-bold">{grid.gridName}</h2>
                    <p>Weeks: {grid.weeks?.length || 0}</p>
                    {/* Add any additional grid information or actions here */}
                </li>
                ))}
            </ul>
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
