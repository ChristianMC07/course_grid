import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs';


export default function Create() {

  const { userId } = auth();
  console.log(userId);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <form className="space-y-4">
          <h1 className="text-xl font-bold">Create new course:</h1>

          <input hidden name='userID' value={userId!} />

          <label htmlFor="courseCode" className="block text-gray-700 text-sm font-bold mb-2">
            Course code
          </label>

          <input
            type="text"
            id="courseCode"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            name='courseCode'
          />

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

          <label htmlFor="courseDescription" className="block text-gray-700 text-sm font-bold mb-2">
            Course description
          </label>
          <textarea
            id="courseDescription"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            name="courseDescription"
          />

          <input type='file' name='imageUrl' />


          <div className="flex items-center justify-between mt-6">
            <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create
            </button>
            <Link href="/courses" className="font-bold text-sm text-blue-500 hover:text-blue-800">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}