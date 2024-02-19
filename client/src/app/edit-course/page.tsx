'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Courses } from '@/tools/data.model';
import { capitalizeWords } from '@/tools/Toolkit';

const EditCoursePage: React.FC = () => {
  const [course, setCourse] = useState<Courses | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      setLoading(true);
      // This should be an actual API call to fetch the course data
      // For demonstration, we're using a hardcoded course
      const fetchedCourse: Courses = {
        _id: id as string,
        name: 'Sample Course',
        description: 'This is a sample description',
        code: 'CS101',
        imageUrl: '/path/to/image.jpg',
      };
      setCourse(fetchedCourse);
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedCourse = {
      name: capitalizeWords(event.currentTarget.courseName.value),
      description: event.currentTarget.courseDescription.value,
      code: course?.code,
      imageUrl: course?.imageUrl,
    };

    // Here you would call an API to update the course
    console.log('Updated course:', updatedCourse);
    // After successful update, redirect to the workspace
    router.push('/workspace');
  };

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="flex justify-between items-center mb-6">
        <Link href="/home"><a className="text-2xl font-bold">Logo</a></Link>
        <Link href="/"><a className="text-sm font-semibold text-gray-700 hover:text-gray-900">Log Out</a></Link>
      </nav>

      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h1 className="text-xl font-bold">Edit Course:</h1>

          <label htmlFor="courseName" className="block text-gray-700 text-sm font-bold mb-2">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            defaultValue={course.name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          <label htmlFor="courseDescription" className="block text-gray-700 text-sm font-bold mb-2">
            Course Description
          </label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            defaultValue={course.description}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          {/*add an image upload feature here */}
          
          <div className="flex items-center justify-between mt-6">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Course
            </button>
            <Link href="/workspace"><a className="font-bold text-sm text-blue-500 hover:text-blue-800">
              Cancel
            </a></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoursePage;
