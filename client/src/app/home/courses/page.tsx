import React from 'react';
import Link from 'next/link';
import { thisUserCourses } from '@/actions/thisUserCourses';
import Image from 'next/image';
import { promises as fs } from 'fs';
import { join } from "path";

export default async function Courses() {

  const userInfo = await thisUserCourses()

  const projectRoot = process.cwd();
  const imagesDir = join(projectRoot, 'public', 'images');

  console.log(userInfo);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Courses</h1>
        </div>
        <Link href="/home/courses/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          + Add Course
        </Link>

        {(typeof (userInfo) !== undefined) && (typeof (userInfo) !== null)
          ? userInfo!.courses!.map((course, index) => (
            <div key={index} className="mt-10 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{course.courseName}</h5>
                <p className="mb-3 font-normal text-gray-700">{course.courseDescription}</p>
              </div>

              <Image
                src={`/images/${course.coursePhoto}`}
                className="w-fit"
                width={500}
                height={500}
                alt={course.coursePhoto} />

              <div className="p-5">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">ID: {course.courseID}</span>
              </div>

              <div className='flex justify-around align-middle'>
                <Link href={`/home/courses/${course.courseID}/edit`} className="bg-blue-500 text-white px-4 py-2 rounded my-4 hover:bg-blue-700 focus:outline-none active:bg-blue-900">Edit</Link>
                <Link href={`/home/courses/${course.courseID}/delete`} className="bg-red-500 text-white px-4 py-2 rounded  my-4 hover:bg-red-700 focus:outline-none active:bg-red-900">Delete</Link>
                <Link href={`#`} className="bg-green-500 text-white px-4 py-2 rounded  my-4 hover:bg-green-700 focus:outline-none active:bg-green-900">Grids</Link>
              </div>


            </div>
          ))

          :
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">Looks like you have no courses yet.</p>
          </div>
        }

      </main >
    </div >
  );
}
