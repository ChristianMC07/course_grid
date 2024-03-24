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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{props.params.id} - Grids</h1>
            <Link href={`/home/courses/${props.params.id}/grids/create`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              + Add Grid
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userGrids && userGrids.length > 0 ? (
            userGrids.map((grid, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800">{grid.gridName}</h2>
                  <p>Weeks: {grid.weeks?.length}</p>
                </div>
                <div className='flex justify-between p-4 bg-gray-100'>
                  <Link href={`/home/courses/${props.params.id}/grids/${index}/view`} className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded transition duration-300">
                    View
                  </Link>
                  <div className="flex gap-2">
                    <Link href={`/home/courses/${props.params.id}/grids/${index}/edit`} className="text-blue-500 hover:text-blue-700 transition-colors duration-300 px-3 py-1 rounded border border-blue-500 hover:border-blue-700">
                      Edit
                    </Link>
                    <Link href={`/home/courses/${props.params.id}/grids/${index}/duplicate`} className="text-green-500 hover:text-green-700 transition-colors duration-300 px-3 py-1 rounded border border-green-500 hover:border-green-700">
                      Duplicate
                    </Link>
                    <Link href={`/home/courses/${props.params.id}/grids/${index}/delete`} className="text-red-500 hover:text-red-700 transition-colors duration-300 px-3 py-1 rounded border border-red-500 hover:border-red-700">
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">Looks like you have no grids yet.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  