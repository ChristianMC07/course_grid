// src/app/home/courses/[id]/edit/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchCourse } from '@/actions/fetchCourse';
import { Course } from '@/tools/data.model';
import { thisUserCourses } from '@/actions/thisUserCourses';


const EditCoursePage = () => {
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [courseId, setCourseId] = useState<string>('');

  useEffect(() => {
    // Extract the course ID from the URL
    const urlParts = window.location.pathname.split('/');
    const id = urlParts[urlParts.length - 2]; // Assuming the URL is like /home/courses/{id}/edit
    console.log("Extracted Course ID:", id); // Log the extracted course ID
    setCourseId(id);

    const loadCourseData = async () => {
      console.log("Attempting to fetch course data for ID:", id);
      const course = await fetchCourse(id);
      console.log("Fetched course data:", course); // Log the fetched course data
      if (course) {
        setCourseData(course);
      } else {
        console.log("No course data found for ID:", id);
      }
    };

    if (id) {
      loadCourseData();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  if (!courseData) {
    return <div>No Course data</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <form className="space-y-4" onSubmit={handleSubmit} noValidate encType="multipart/form-data">
          <h1 className="text-xl font-bold">Edit Course</h1>
          {/* Pre-fill form fields with courseData */}
          <div>
            <label htmlFor="courseID" className="block text-gray-700 text-sm font-bold mb-2">
              Course Code
            </label>
            <input
              type="text"
              id="courseID"
              value={courseData.courseID}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>
          <div>
            <label htmlFor="courseName" className="block text-gray-700 text-sm font-bold mb-2">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              value={courseData.courseName}
              name="courseName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="courseDescription" className="block text-gray-700 text-sm font-bold mb-2">
              Course Description
            </label>
            <textarea
              id="courseDescription"
              value={courseData.courseDescription}
              name="courseDescription"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="coursePhoto" className="block text-gray-700 text-sm font-bold mb-2">
              Course Photo
            </label>
            <input
              type="file"
              id="coursePhoto"
              name="coursePhoto"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save Changes
            </button>
            <Link href="/home/courses" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoursePage;
