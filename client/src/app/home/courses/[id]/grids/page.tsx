import Link from 'next/link';
import { thisUserCourses } from '@/actions/thisUserCourses';

export default async function Grids() {

    return (
        <div className="min-h-[85vh] bg-gray-100">
            <div className="p-10">
                <div className="flex items-center mb-6 gap-x-6">
                    <h1 className="text-3xl font-bold text-gray-800">Course Name - Grids</h1>
                    <Link href="/home/courses/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        + Add Grid
                    </Link>
                </div>
                <p className="text-gray-600 mb-4">Looks like you have no courses yet.</p>
            </div>
            <main>
            </main>

        </div>
    );
}