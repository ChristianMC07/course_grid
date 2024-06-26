'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { createGrid } from '@/actions/createGrid';

interface createGridPageProps {
    params: {
        id: string
    }
}

export default function CreateGrid(props: createGridPageProps) {

    type ErrorMessage = {
        [key: string]: any;
    }

    const formData = new FormData();

    const [formState, action] = useFormState<ErrorMessage, FormData>(createGrid, formData);
    return (
        <div className="min-h-[85vh] bg-gray-100 pl-10 pt-10">

            <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
                <form className="space-y-4" noValidate action={action}>
                    <h1 className="text-xl font-bold" >Create grid for {props.params.id}</h1>
                    <input type='hidden' value={props.params.id} name='courseID' />
                    <label htmlFor="gridName" className="block text-gray-700 text-sm font-bold mb-2">
                        Grid name
                    </label>
                    <input
                        type="text"
                        id="gridName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        name='gridName'
                    />
                    {formState?.gridNameError ? <span className='text-red-500'>{formState.gridNameError}</span> : ''}



                    <label htmlFor="weeks" className="block text-gray-700 text-sm font-bold mb-2">
                        Number of weeks
                    </label>
                    <input
                        type="number"
                        min={0}
                        id="weeks"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        name='weeks'
                    />

                    {formState?.weeksError ? <span className='text-red-500'>{formState.weeksError}</span> : ''}

                    <div className="flex items-center justify-between mt-6">
                        <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Create
                        </button>
                        <Link href={`/home/courses/${props.params.id}/grids`} className="font-bold text-sm text-blue-500 hover:text-blue-800">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )

}