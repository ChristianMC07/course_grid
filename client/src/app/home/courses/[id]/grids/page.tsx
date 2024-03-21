import Link from 'next/link';
import { Grid } from '@/tools/data.model';
import { thisCourseGrids } from '@/actions/thisUserGrids';

interface GridsPageProps {
    params: {
        id: string
    }
}

export default async function GridsPage(props: GridsPageProps) {

    const userGrids = await thisCourseGrids(props.params.id) as Grid[];



    return (
        <div className="min-h-[85vh] bg-gray-100 px-10 pt-10">
            <div className="mb-10">
                <div className="flex items-center mb-6 gap-x-6">
                    <h1 className="text-3xl font-bold text-gray-800">{props.params.id} - Grids</h1>
                    <Link href={`/home/courses/${props.params.id}/grids/create`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        + Add Grid
                    </Link>
                </div>
            </div>
            <main className="flex gap-x-20 flex-wrap justify-evenly">
                {userGrids ? (
                    userGrids.map((grid, index) => (
                        <div key={index} className="mt-10 max-w-sm  bg-white rounded-lg border border-gray-200 shadow-md p-10 flex flex-col gap-y-2">
                            <h2 className="text-xl font-bold text-gray-800">{grid.gridName}</h2>
                            <p>Weeks: {grid.weeks!.length}</p>
                            <div className='flex gap-2 flex-wrap'>
                                <Link href={`/home/courses/${props.params.id}/grids/${index}/view`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none active:bg-blue-900">View</Link>
                                <Link href={`/home/courses/${props.params.id}/grids/${index}/edit`} className="bg-slate-500 text-white px-4 py-2 rounded  hover:bg-slate-700 focus:outline-none active:bg-slate-900">Edit</Link>
                                <Link href={`/home/courses/${props.params.id}/grids/${index}/duplicate`} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none active:bg-green-900">Duplicate</Link>
                                <Link href={`/home/courses/${props.params.id}/grids/${index}/delete`} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none active:bg-red-900">Delete</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">Looks like you have no grids yet.</p>
                )}
            </main>

        </div>
    );
}