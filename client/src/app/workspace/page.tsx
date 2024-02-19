
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Courses } from '@/tools/data.model';

const WorkspacePage: React.FC = () => {
  const [courses, setCourses] = useState<Courses[]>([]);

  // Hardcoded user data for development purposes
  const hardcodedAccountId = 'luqanuhos@mailinator.com';

  useEffect(() => {
    const fetchCourses = async () => {
      // Fetch courses for the hardcoded user
      const res = await fetch(`/api/courses/get/${hardcodedAccountId}`);
      if (res.ok) {
        const data: Courses[] = await res.json();
        setCourses(data);
      } else {
        console.error('Failed to fetch courses');
      }
    };

    fetchCourses();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white px-8 py-4 shadow-md flex justify-between items-center">
        <Link href="/home"className="text-xl font-bold">Logo</Link>
        <Link href="/"className="hover:text-red-700">Log Out</Link>
      </nav>

      <main className="p-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Your workspace</h1>
          <Link href="/create-course" className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
              + Add Course
          </Link>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div key={course._id} className="bg-white p-4 shadow rounded">
                <img src={course.imageUrl} alt="Course" className="w-full object-cover h-32 sm:h-48 md:h-64 lg:h-80 rounded-lg" />
                <h2 className="mt-2 text-xl font-bold">{course.name}</h2>
                <p className="text-gray-600">{course.description}</p>
                <div className="mt-4">
                  <Link className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2" href={`/edit-course/${course._id}`}>
                      Edit Course
                  </Link>
                  <Link className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" href={`/delete-course/${course._id}`}>              
                      Delete Course                 
                  </Link>
                  <Link className="text-sm bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" href={`/course-grids/${course._id}`}>
                      Grid
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">Looks like you have no courses yet.</p>
            <Link href="/create-course" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create new course
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
export default WorkspacePage;
