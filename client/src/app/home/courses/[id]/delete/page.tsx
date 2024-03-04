'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchCourse } from '@/actions/fetchCourse';
import { deleteCourse } from '@/actions/deleteCourse';
import { Course } from '@/tools/data.model';
import SpinnerLoading from "@/app/loading";

const Delete = () => {
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [courseId, setCourseId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Extract the course ID from the URL
    const urlParts = window.location.pathname.split('/');
    const id = urlParts[urlParts.length - 2]; 
    setCourseId(id);

    const loadCourseData = async () => {
      const course = await fetchCourse(id);
      if (course) {
        setCourseData(course);
        setIsLoading(false);
      }
    };

    if (id) {
      loadCourseData();
    }
  }, []);

  const handleDelete = async () => {
    if (courseId) {
      const result = await deleteCourse(courseId);
      if (result) {
        // Handle successful deletion, e.g., redirecting to the courses page
        window.location.href = "/home/courses";
      } else {
        // Handle deletion failure
        alert("Failed to delete the course");
      }
    }
  };

  if (!courseData) {
    return <SpinnerLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Are you sure you want to delete this course?</h1>
        <p className="mb-4">Course: {courseData.courseName} (ID: {courseData.courseID})</p>
        <div className="flex items-center justify-between">
          <button onClick={handleDelete} className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Delete
          </button>
          <Link href="/home/courses" className="font-bold text-sm text-blue-500 hover:text-blue-800">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Delete;
