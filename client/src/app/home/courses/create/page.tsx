'use client';

import { useFormState } from 'react-dom';

import Link from 'next/link';

import { createCourse } from '@/actions/createCourse';
import React from 'react';


export default function Create() {

  type ErrorMessage = {
    [key: string]: any;
  };

  const [formState, action] = useFormState<ErrorMessage, FormData>(createCourse, new FormData());

  const formRef = React.useRef(null);

  const handleCreate = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    action(formData);
  }


  return (
    <div className="min-h-[85vh] bg-gray-100 p-8">

      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <form className="space-y-4" noValidate encType="multipart/form-data" ref={formRef}>
          <h1 className="text-xl font-bold">Create new course:</h1>

          <label htmlFor="courseID" className="block text-gray-700 text-sm font-bold mb-2">
            Course code
          </label>
          {/* other code */}

          <input
            type="text"
            id="courseID"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            name='courseID'
          />
          {formState?.courseIDError ? <span className='text-red-500'>{formState.courseIDError} </span> : ''}

          <label htmlFor="courseName" className="block text-gray-700 text-sm font-bold mb-2">
            Course name
          </label>
          <input
            type="text"
            id="courseName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            name='courseName'
          />
          {formState?.courseNameError ? <span className='text-red-500'>{formState.courseNameError} </span> : ''}

          <label htmlFor="courseDescription" className="block text-gray-700 text-sm font-bold mb-2">
            Course description
          </label>
          <textarea
            id="courseDescription"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            name="courseDescription"
          />
          {formState?.courseDescriptionError ? <span className='text-red-500'>{formState.courseDescriptionError} </span> : ''}

          <input type='file' name='coursePhoto' />

          {formState?.coursePhotoError ? <p className='text-red-500'>{formState.coursePhotoError} </p> : ''}


          <div className="flex items-center justify-between mt-6">
            <button type="submit" onClick={handleCreate} className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create
            </button>
            <Link href="/home/courses" className="font-bold text-sm text-blue-500 hover:text-blue-800">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}