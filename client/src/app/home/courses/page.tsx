import React from 'react';
import Link from 'next/link';


export default async function Courses() {
  // const { isAuthenticated, isLoading } = useAuthStatus();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Courses</h1>
        </div>
        <Link href="/home/courses/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          + Add Course
        </Link>


        <div className="text-center py-10">
          <p className="text-gray-600 mb-4">Looks like you have no courses yet.</p>
          {/* <Link href="/create-course" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Your First Course
          </Link> */}
        </div>

      </main>
    </div>
  );
}
