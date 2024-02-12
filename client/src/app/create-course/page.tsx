'use client';

import React, { useState } from 'react';
import Link from 'next/link';



const CreateCoursePage: React.FC = () => {
    
  
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');

  
  
// if (!isAuthenticated) {
//     // Handle as appropriate for your app
//     return <div>Please log in to create a course.</div>;
//   }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="flex justify-between items-center mb-6">
        <Link href="/home" className="text-2xl font-bold">Logo</Link>
        <Link href="/" className="text-sm font-semibold text-gray-700 hover:text-gray-900">Log Out</Link>
      </nav>

      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <form className="space-y-4">
          <h1 className="text-xl font-bold">Create new course:</h1>

          <label htmlFor="courseCode" className="block text-gray-700 text-sm font-bold mb-2">
            Course code
          </label>
          <input
            type="text"
            id="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          <label htmlFor="courseName" className="block text-gray-700 text-sm font-bold mb-2">
            Course name
          </label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          <label htmlFor="courseDescription" className="block text-gray-700 text-sm font-bold mb-2">
            Course description
          </label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          {/* Placeholder for image upload input */}
          <div className="flex items-center justify-between">
            <button type="button" className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
              Upload image
            </button>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create
            </button>
            <Link href="/workspace" className="font-bold text-sm text-blue-500 hover:text-blue-800">
                Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;