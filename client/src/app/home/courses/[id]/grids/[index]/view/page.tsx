import { Grid } from "@/tools/data.model";
import { gridWeeks } from "@/actions/gridWeeks";
import WeekComp from "@/app/components/week";
import Link from "next/link";
import HomeIcon from "@/app/components/HomeIcon";

interface ViewGridsProps {
    params: {
        id: string,
        index: string,
    }
};


export default async function ViewGrids(props: ViewGridsProps) {

    const getAllWeekInfo = await gridWeeks(props.params.id, props.params.index) as Grid;

    return (
        <div className="min-h-[85vh] bg-gray-100 px-10 pt-8">

            <div className="flex items-center gap-x-2 pb-4">
                <Link className='text-blue-700 hover:text-blue-500 pb-1' href="/home">
                    <HomeIcon className="fill-current h-6 w-6" />
                </Link>
                <span>/</span>
                <Link className='text-blue-700 hover:text-blue-500' href='/home/courses'>Courses</Link>
                <span>/</span>
                <Link className='text-blue-700 hover:text-blue-500' href={`/home/courses/${props.params.id}/grids`}>Grids</Link>
            </div>


            <h1 className="text-3xl font-bold text-gray-800">{props.params.id} - {getAllWeekInfo.gridName} </h1>

            <WeekComp gridInfo={getAllWeekInfo} courseID={props.params.id} gridID={props.params.index} />

        </div>
    )
}