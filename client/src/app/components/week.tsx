'use client';
import Image from "next/image";
import { Grid, Week } from "@/tools/data.model";

interface WeekProps {
    gridInfo: Grid;
};

export default function WeekComp({ gridInfo }: WeekProps) {
    return (
        <section>
            {gridInfo.weeks && gridInfo.weeks.length > 0 ? (
                gridInfo.weeks.map((week, index) => (
                    <div key={index} className="flex flex-col mb-5">
                        <div className="flex justify-between bg-black text-white p-4 gap-4">
                            <h2 className="text-2xl font-black">{week.weekName}</h2>
                            <div className="flex gap-4">
                                <Image width={30} height={30} alt="Red trash bin to delete week" src='/images/icons/delete-128.png' />
                                <Image width={40} height={40} alt="Show more button" src='/images/icons/chevron.png' />
                            </div>
                        </div>
                        {/* Adjustments for horizontal scrolling */}
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
                                        <div className="flex gap-x-4">
                                            <div className="w-28 p-4 border border-slate-400">2</div>
                                            <div className="w-64 p-4 border border-slate-400">
                                                Building an App using functional programming
                                                Using Xdebug</div>
                                            <div className="w-64 p-4   border border-slate-400">
                                                Includes, Requires
                                                Putting functions in one file
                                                Reading files
                                                Callables
                                                Xdebug</div>
                                            <div className="w-64 p-4  border border-slate-400"></div>
                                            <div className="w-64 p-4  border border-slate-400">challenge</div>
                                            <div className="w-64 p-4  border border-slate-400"></div>
                                            <div className="flex items-center gap-x-4">
                                                <Image width={30} height={30} alt="Green pencil. Edit selected row" src='/images/icons/edit.png' />
                                                <Image width={30} height={30} alt="Red trash bin to delete week" src='/images/icons/delete-128.png' />
                                            </div>
                                            {/* Additional row cells */}
                                        </div>
                                        <div className="flex py-6 gap-x-4 items-center">
                                            <input className="w-28 h-10 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"></input>
                                            <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white"></textarea>
                                            <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white"></textarea>
                                            <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white"></textarea>
                                            <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white"></textarea>
                                            <textarea className="w-64 h-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline bg-white"></textarea>
                                            <Image src={`/images/icons/plus.png`} width={30} height={30} alt="Plus button to add new row"></Image>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>


                ))
            ) : <p>No weeks to display</p>}


        </section>
    );
}
