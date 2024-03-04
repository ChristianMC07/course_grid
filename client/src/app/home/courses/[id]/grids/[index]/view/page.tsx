import { Grid } from "@/tools/data.model";
import { gridWeeks } from "@/actions/gridWeeks";
import WeekComp from "@/app/components/week";

interface ViewGridsProps {
    params: {
        id: string,
        index: string,
    }
};


export default async function ViewGrids(props: ViewGridsProps) {

    const getAllWeekInfo = await gridWeeks(props.params.id, props.params.index) as Grid;

    return (
        <div className="min-h-[85vh] bg-gray-100 px-10 pt-10">
            <h1 className="text-3xl font-bold text-gray-800">{props.params.id} - {getAllWeekInfo.gridName} </h1>

            <WeekComp gridInfo={getAllWeekInfo} />

        </div>
    )
}