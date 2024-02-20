import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Assuming you've correctly set up editCourse action
import { editCourse } from '@/actions/editCourse';

const EditCoursePage: React.FC = () => {
  const router = useRouter();
  const { id: courseId } = router.query;

  const [courseData, setCourseData] = useState({
    code: '',
    name: '',
    description: '',
  });

  // Fetch course data for initial form values if needed
  useEffect(() => {
    const fetchCourseData = async () => {
      // const data = await fetchCourseDetails(courseId);
      // setCourseData({ code: data.code, name: data.name, description: data.description });
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await editCourse(courseId as string, courseData);
      // Handle successful edit
      router.push(`/home/courses/${courseId}`);
    } catch (error) {
      console.error('Failed to update course', error);
      // Handle error
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-xl font-bold">Edit Course:</h1>

          <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">
            Course Code
          </label>
          <input
            type="text"
            name="code"
            value={courseData.code}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Course Name
          </label>
          <input
            type="text"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Course Description
          </label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          <div className="flex items-center justify-between mt-6">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save Changes
            </button>
            <Link href="/courses" className="font-bold text-sm text-blue-500 hover:text-blue-800">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoursePage;
