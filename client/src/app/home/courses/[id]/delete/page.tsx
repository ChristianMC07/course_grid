'use client';

import React from 'react';
import Link from 'next/link';
import { deleteCourse } from '@/actions/deleteCourse';

type DeleteProps = {
  courseId: string; // Add this prop type
};

export default function Delete({ courseId }: DeleteProps) {
  const handleDelete = async () => {
    if (courseId) {
      const result = await deleteCourse(courseId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Are you sure you want to delete this course?</h1>
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
}
