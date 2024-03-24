import React from 'react';
import Link from 'next/link';
import { thisUserCourses } from '@/actions/thisUserCourses';
import Image from 'next/image';

export default async function Courses() {
  const userInfo = await thisUserCourses();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Courses</h1>
          <Link href="/home/courses/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            + Add Course
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {userInfo?.courses?.map((course, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
              <div className="h-48 w-full relative">
                <Image
                  src={`/images/${course.coursePhoto}`}
                  layout="fill"
                  objectFit="cover"
                  alt={`Course image for ${course.courseName}`} 
                />
              </div>
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{course.courseName}</h5>
                <p className="mb-3 font-normal text-gray-700">{course.courseDescription}</p>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">ID: {course.courseID}</span>
              </div>
              <div className='flex justify-between p-4 bg-gray-100'>
                <Link href={`/home/courses/${course.courseID}/grids`} className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-300">
                  Grids
                </Link>
                <div className="flex gap-2">
                  <Link href={`/home/courses/${course.courseID}/edit`} className="text-blue-500 hover:text-blue-700 transition-colors duration-300 px-4 py-2 rounded border border-blue-500 hover:border-blue-700">
                    Edit
                  </Link>
                  <Link href={`/home/courses/${course.courseID}/delete`} className="text-red-500 hover:text-red-700 transition-colors duration-300 px-4 py-2 rounded border border-red-500 hover:border-red-700">
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {userInfo && userInfo.courses && userInfo.courses.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">Looks like you have no courses yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}