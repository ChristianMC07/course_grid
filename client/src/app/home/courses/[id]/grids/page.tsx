import Link from 'next/link';

interface GridsPageProps {
    params: {
        id: string
    }
}

export default async function GridsPage(props: GridsPageProps) {



    return (
        <div className="min-h-[85vh] bg-gray-100 pl-10 pt-10">
            <div className="mb-10">
                <div className="flex items-center mb-6 gap-x-6">
                    <h1 className="text-3xl font-bold text-gray-800">{props.params.id} - Grids</h1>
                    <Link href="/home/courses/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        + Add Grid
                    </Link>
                </div>
            </div>
            <main className=''>
                <p className="text-gray-600 mb-4">Looks like you have no courses yet.</p>
            </main>

        </div>
    );
}