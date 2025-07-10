'use client';
import Image from "next/image";
import { Grid, Week } from "@/tools/data.model";
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { createRow, editRow, deleteRow, deleteWeek, createWeek } from "@/actions/rowActions";
import Link from "next/link";

interface WeekProps {
    gridInfo: Grid;
    courseID: string;
    gridID: string;
};

export default function WeekComp({ gridInfo, courseID, gridID }: WeekProps) {

    type ErrorMessage = {
        [key: string]: any;
    };

    const [visibleWeeks, setVisibleWeeks] = useState<{ [key: string]: boolean }>({});

    const [editRowIndex, setEditRowIndex] = useState<null | number>(null);


    const toggleDropdown = (index: number) => {
        setVisibleWeeks(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const toggleEdit = (index: number) => {
        setEditRowIndex(prevIndex => prevIndex === index ? null : index);
    };

    const formRef = React.useRef(null);
    const deleteFormRef = React.useRef(null);

    const [formState, action] = useFormState<ErrorMessage, FormData>(createRow, new FormData());

    const [editFormState, editAction] = useFormState<ErrorMessage, FormData>(editRow, new FormData());

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(formRef.current!);
        editAction(formData);
        setEditRowIndex(null);
    }

    const handleDeleteWeek = async (courseID: string, gridName: string, weekName: string, event: any) => {
        const confirmed = window.confirm(`Are you sure you want to delete the ${weekName}?`);
        if (confirmed) {
            event.preventDefault();
            await deleteWeek(courseID, gridName, weekName);
            alert(`${weekName} successfully deleted`);
        } else {
            alert(`${weekName} not deleted`);
        }
    }

    const handleCreateWeek = async (courseID: string, gridName: string, event: any, weekNumber: number = 2) => {
        event.preventDefault();
        await createWeek(courseID, gridName, weekNumber);

    }

    const handleDeleteRow = async (event: any) => {
        const confirmed = window.confirm("Are you sure you want to delete this row?");
        if (confirmed) {
            event.preventDefault();
            const deleteFormData = new FormData(deleteFormRef.current!)
            await deleteRow(deleteFormData);
        }
    }

    return (
        <>

            <button className="inline-flex items-center mt-4 border border-transparent text-sm shadow-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event) => gridInfo.weeks ? handleCreateWeek(courseID, gridInfo.gridName, event, gridInfo.weeks.length) : handleCreateWeek(courseID, gridInfo.gridName, event)}>
                Add New Week
            </button>


            <section className="pt-8">
                {gridInfo.weeks && gridInfo.weeks.length > 0 ?
                    gridInfo.weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col mb-5">
                            <div className="flex justify-between bg-black text-white p-4 gap-4">
                                <h2 className="text-2xl font-black">{week.weekName}</h2>
                                <div className="flex gap-4">
                                    {gridInfo!.weeks!.length - 1 == weekIndex && (

                                        <Image width={30} height={30} alt="Red trash bin to delete week" src='/icons/delete-128.png' onClick={(event) => handleDeleteWeek(courseID, gridInfo.gridName, week.weekName, event)} />
                                    )}
                                    <Image width={40} height={40} alt="Show more button" src='/icons/chevron.png' onClick={() => toggleDropdown(weekIndex)} />
                                </div>
                            </div>
                            {/* Adjustments for horizontal scrolling */}
                            {visibleWeeks[weekIndex] && (

                                <div className="overflow-x-auto mt-4">
                                    <div className="min-w-max">
                                        <div className="flex flex-col gap-y-4">
                                            {/* Table Header */}
                                            <div className="flex gap-x-4">
                                                <div className="w-28 font-bold p-4 bg-gray-200">Class ID</div>
                                                <div className="w-64 font-bold p-4 bg-gray-200">Learning Outcome</div>
                                                <div className="w-64 font-bold p-4 bg-gray-200">Enabling Outcome</div>
                                                <div className="w-64 font-bold p-4 bg-gray-200">Material</div>
                                                <div className="w-64 font-bold p-4 bg-gray-200">Assessment</div>
                                                <div className="w-64 font-bold p-4 bg-gray-200">Notes</div>
                                                <div className="w-28 font-bold p-4 bg-gray-200">Actions</div>

                                                {/* Additional header columns */}
                                            </div>
                                            {/* Table Rows */}
                                            <div className="flex flex-col">
                                                {(week.rows && week.rows.length > 0) ? (
                                                    week.rows.map((row, rowIndex) => (
                                                        <div key={rowIndex} className="flex gap-x-4">
                                                            {editRowIndex === rowIndex ? (
                                                                <form className="flex gap-x-4" key={editFormState?.resetKey} ref={formRef}>
                                                                    <input type="hidden" name="courseID" value={courseID} />
                                                                    <input type="hidden" name="gridName" value={gridInfo.gridName} />
                                                                    <input type="hidden" name="weekName" value={gridInfo.weeks![weekIndex].weekName} />
                                                                    <input type="hidden" name="rowIndex" value={rowIndex} />

                                                                    <div className="flex flex-col w-28">
                                                                        <input
                                                                            className="w-28 h-10 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                                                            name="classID"
                                                                            defaultValue={row.classID}
                                                                        />
                                                                        {editFormState?.classIDError ? <span className='text-red-500 flex flex-wrap'>{editFormState.classIDError} </span> : ''}
                                                                    </div>

                                                                    <div className="flex flex-col w-64">
                                                                        <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white" name="learningOutcome" defaultValue={row.learningOutcome}></textarea>
                                                                        {editFormState?.learningOutcomeError ? <span className='text-red-500 flex flex-wrap'>{editFormState.learningOutcomeError} </span> : ''}
                                                                    </div>

                                                                    <div className="flex flex-col w-64">
                                                                        <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white" name="enablingOutcome" defaultValue={row.enablingOutcome}></textarea>
                                                                        {editFormState?.enablingOutcomeError ? <span className='text-red-500 flex flex-wrap'>{editFormState.enablingOutcomeError} </span> : ''}
                                                                    </div>

                                                                    <div className="flex flex-col w-64">
                                                                        <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white" name="material" defaultValue={row.material}></textarea>
                                                                        {editFormState?.materialError ? <span className='text-red-500 flex flex-wrap'>{editFormState.materialError} </span> : ''}
                                                                    </div>

                                                                    <div className="flex flex-col w-64">
                                                                        <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white" name="assessment" defaultValue={row.assessment}></textarea>
                                                                        {editFormState?.assessmentError ? <span className='text-red-500 flex flex-wrap'>{editFormState.assessmentError} </span> : ''}
                                                                    </div>

                                                                    <div className="flex flex-col w-64">
                                                                        <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white" name="notes" defaultValue={row.notes}></textarea>
                                                                        {editFormState?.notesError ? <span className='text-red-500 flex flex-wrap'>{editFormState.notesError} </span> : ''}
                                                                    </div>
                                                                    <div className="flex items-center gap-x-4">
                                                                        <button type="submit" onClick={handleSubmit}>
                                                                            <Image width={30} height={30} alt="Red thrash bin to delete week" src='/icons/save.png' />
                                                                        </button>
                                                                        <button type="button" onClick={() => setEditRowIndex(null)}><Image width={30} height={30} alt="Red thrash bin to delete week" src='/icons/cancel.png' /></button>.
                                                                    </div>
                                                                </form>
                                                            ) : <>
                                                                <div className="w-28 p-4 border border-slate-400">{row.classID}</div>
                                                                <div className="w-64 p-4 border border-slate-400 whitespace-pre text-wrap">{row.learningOutcome}</div>
                                                                <div className="w-64 p-4 border border-slate-400 whitespace-pre text-wrap">
                                                                    {row.enablingOutcome}</div>
                                                                <div className="w-64 p-4  border border-slate-400 whitespace-pre text-wrap">{row.material}</div>
                                                                <div className="w-64 p-4  border border-slate-400 whitespace-pre text-wrap">{row.assessment}</div>
                                                                <div className="w-64 p-4  border border-slate-400 whitespace-pre text-wrap">{row.notes}</div>

                                                                <form className="flex items-center gap-x-4" ref={deleteFormRef}>

                                                                    <input type="hidden" name="courseID" value={courseID} />
                                                                    <input type="hidden" name="gridName" value={gridInfo.gridName} />
                                                                    <input type="hidden" name="gridID" value={gridID} />
                                                                    <input type="hidden" name="weekName" value={gridInfo.weeks![weekIndex].weekName} />
                                                                    <input type="hidden" name="rowIndex" value={rowIndex} />


                                                                    <Image
                                                                        width={30}
                                                                        height={30}
                                                                        alt="Green pencil. Edit selected row"
                                                                        src='/icons/edit.png'
                                                                        onClick={() => toggleEdit(rowIndex)}
                                                                        className="cursor-pointer"
                                                                    />

                                                                    <button
                                                                        type="submit"
                                                                        onClick={handleDeleteRow}
                                                                    >
                                                                        <Image width={30} height={30} alt="Red thrash bin to delete week" src='/icons/delete-128.png' />
                                                                    </button>
                                                                </form>
                                                                {/* Additional row cells */}


                                                            </>}
                                                        </div>
                                                    ))
                                                ) : ''

                                                }
                                                <form
                                                    className="flex py-6 gap-x-4 items-center"
                                                    action={action}
                                                    key={formState?.resetKey}>
                                                    <input type="hidden" name="courseID" value={courseID} />
                                                    <input type="hidden" name="gridName" value={gridInfo.gridName} />
                                                    <input type="hidden" name="weekName" value={gridInfo.weeks![weekIndex].weekName} />

                                                    <div className="flex flex-col w-28">
                                                        <input
                                                            className="w-28 h-10 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                                            name="classID"
                                                            defaultValue={''}
                                                        />
                                                        {formState?.classIDError ? <span className='text-red-500 flex flex-wrap'>{formState.classIDError} </span> : ''}
                                                    </div>

                                                    <div className="flex flex-col w-64">
                                                        <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white" name="learningOutcome" defaultValue={''}></textarea>
                                                        {formState?.learningOutcomeError ? <span className='text-red-500 flex flex-wrap'>{formState.learningOutcomeError} </span> : ''}
                                                    </div>

                                                    <div className="flex flex-col w-64">
                                                        <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white" name="enablingOutcome" defaultValue={''}></textarea>
                                                        {formState?.enablingOutcomeError ? <span className='text-red-500 flex flex-wrap'>{formState.enablingOutcomeError} </span> : ''}
                                                    </div>

                                                    <div className="flex flex-col w-64">
                                                        <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white" name="material"></textarea>
                                                        {formState?.materialError ? <span className='text-red-500 flex flex-wrap'>{formState.materialError} </span> : ''}
                                                    </div>

                                                    <div className="flex flex-col w-64">
                                                        <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white" name="assessment"></textarea>
                                                        {formState?.assessmentError ? <span className='text-red-500 flex flex-wrap'>{formState.assessmentError} </span> : ''}
                                                    </div>

                                                    <div className="flex flex-col w-64">
                                                        <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white" name="notes"></textarea>
                                                        {formState?.notesError ? <span className='text-red-500 flex flex-wrap'>{formState.notesError} </span> : ''}
                                                    </div>

                                                    <div className="flex items-center gap-x-4 w-28">
                                                        <button type="submit"><Image src={`/icons/plus.png`} width={30} height={30} alt="Plus button to add new row"></Image></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>


                    )) : <p>No weeks to display</p>
                }


            </section>
        </>
    );
}
