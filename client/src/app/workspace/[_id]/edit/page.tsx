'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EditCoursePage: React.FC = () => {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query; // Assume 'id' is the course ID

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!id) return;
      const response = await fetch(`/api/courses/${id}`);
      const data = await response.json();
      setCourseCode(data.code);
      setCourseName(data.name);
      setCourseDescription(data.description);
      setIsLoading(false);
    };

    fetchCourseData();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Here, you would send a PUT request to update the course
    console.log({
      courseCode,
      courseName,
      courseDescription,
    });
    // Redirect to workspace or show success message
    router.push('/workspace');
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="flex justify-between items-center mb-6">
        <Link href="/home"><a className="text-2xl font-bold">Logo</a></Link>
        <Link href="/"><a className="text-sm font-semibold text-gray-700 hover:text-gray-900">Log Out</a></Link>
      </nav>

      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-xl font-bold">Edit Course:</h1>

          <label htmlFor="courseCode" className="block text-gray-700 text-sm font-bold mb-2">
            Course Code
          </label>
          <input
            id="courseCode"
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          <label htmlFor="courseName" className="block text-gray-700 text-sm font-bold mb-2">
            Course Name
          </label>
          <input
            id="courseName"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          <label htmlFor="courseDescription" className="block text-gray-700 text-sm font-bold mb-2">
            Course Description
          </label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          {/* Consider adding an image upload field here if needed */}

          <div className="flex items-center justify-between mt-6">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update
            </button>
            <Link href="/workspace"><a className="font-bold text-sm text-blue-500 hover:text-blue-800">Cancel</a></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoursePage;
