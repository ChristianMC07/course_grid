'use client';
import Image from "next/image";
import { Grid, Week } from "@/tools/data.model";
import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { createRow } from "@/actions/createRow";
import { useRef } from 'react';

interface WeekProps {
    gridInfo: Grid;
    courseID: string;
};

export default function WeekComp({ gridInfo, courseID }: WeekProps) {

    type ErrorMessage = {
        [key: string]: any;
    };

    const [visibleWeeks, setVisibleWeeks] = useState<{ [key: string]: boolean }>({});

    const toggleDropdown = (index: number) => {
        setVisibleWeeks(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const [formState, action] = useFormState<ErrorMessage, FormData>(createRow, new FormData());



    return (
        <section>
            {gridInfo.weeks && gridInfo.weeks.length > 0 ?
                gridInfo.weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col mb-5">
                        <div className="flex justify-between bg-black text-white p-4 gap-4">
                            <h2 className="text-2xl font-black">{week.weekName}</h2>
                            <div className="flex gap-4">
                                <Image width={30} height={30} alt="Red trash bin to delete week" src='/images/icons/delete-128.png' />
                                <Image width={40} height={40} alt="Show more button" src='/images/icons/chevron.png' onClick={() => toggleDropdown(weekIndex)} />
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
                                                        <div className="w-28 p-4 border border-slate-400">{row.classID}</div>
                                                        <div className="w-64 p-4 border border-slate-400 whitespace-pre text-wrap">{row.learningOutcome}</div>
                                                        <div className="w-64 p-4 border border-slate-400 whitespace-pre text-wrap">
                                                            {row.enablingOutcome}</div>
                                                        <div className="w-64 p-4  border border-slate-400">{row.material}</div>
                                                        <div className="w-64 p-4  border border-slate-400">{row.assessment}</div>
                                                        <div className="w-64 p-4  border border-slate-400">{row.notes}</div>

                                                        <form className="flex items-center gap-x-4">
                                                            <button type="submit"><Image width={30} height={30} alt="Green pencil. Edit selected row" src='/images/icons/edit.png' /></button>
                                                            <Image width={30} height={30} alt="Red trash bin to delete week" src='/images/icons/delete-128.png' />
                                                        </form>
                                                        {/* Additional row cells */}
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
                                                    <button type="submit"><Image src={`/images/icons/plus.png`} width={30} height={30} alt="Plus button to add new row"></Image></button>
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
    );
}
