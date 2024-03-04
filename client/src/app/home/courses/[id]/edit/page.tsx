'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchCourse } from '@/actions/fetchCourse';
import { Course } from '@/tools/data.model';
import { editCourse } from '@/actions/editCourse';

const EditCoursePage = () => {
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [courseId, setCourseId] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');
  const [courseDescription, setCourseDescription] = useState<string>('');

  useEffect(() => {
    const urlParts = window.location.pathname.split('/');
    const id = urlParts[urlParts.length - 2]; 
    setCourseId(id);

    const loadCourseData = async () => {
      const course = await fetchCourse(id);
      if (course) {
        setCourseData(course);
        setCourseName(course.courseName);
        setCourseDescription(course.courseDescription);
      }
    };

    if (id) {
      loadCourseData();
    }
  }, []);
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('courseName', courseName);
    formData.append('courseDescription', courseDescription);

    const result = await editCourse(courseId, formData);
    if (result) {
      window.location.href = "/home/courses";
    } else {
      alert("Failed to update the course");
    }
  };

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <form className="space-y-4" onSubmit={handleSubmit} noValidate encType="multipart/form-data">
          <h1 className="text-xl font-bold">Edit Course</h1>
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
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
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
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="coursePhoto" className="block text-gray-700 text-sm font-bold mb-2">
              Course Photo
            </label>
            <img
              src={`/images/${courseData.coursePhoto}`}
              alt="Course Photo"
              className="shadow rounded w-full mb-4"
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
