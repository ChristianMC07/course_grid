'use client';

import { useRouter } from 'next/router';
import Link from 'next/link';

export default function DeleteCourse() {
  const router = useRouter();
  const { id } = router.query;

  const handleDelete = async () => {
    // Assuming you have an API endpoint to handle deletion
    const response = await fetch(`/api/courses/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId: id }),
    });

    if (response.ok) {
      router.push('/courses'); // Redirect to courses list after deletion
    } else {
      alert('Failed to delete the course.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Are you sure you want to delete this course?</h1>
        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
          <Link href="/courses">
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Cancel
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
