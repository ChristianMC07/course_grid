'use client';
import Image from "next/image";
import { Grid, Week } from "@/tools/data.model";

interface WeekProps {
    gridInfo: Grid
};

export default function WeekComp(props: WeekProps) {

    return (
        <section>
            {props.gridInfo.weeks!.length > 0 ? (
                props.gridInfo.weeks!.map((week, index) => (
                    <>
                        <div key={index} className="bg-black text-white p-4 flex gap-4 justify-between mb-5">
                            <h2 className="font-black text-2xl">{week.weekName}</h2>
                            <div className="flex gap-4">
                                <Image width={30} height={30} alt="Red thrash bin to delete week" src='/images/icons/delete-128.png' />
                                <Image width={40} height={40} alt="Show more button" src='/images/icons/chevron.png' />
                            </div>

                        </div>
                        <div>

                        </div>
                    </>
                ))
            ) : <></>}

        </section>
    );
}