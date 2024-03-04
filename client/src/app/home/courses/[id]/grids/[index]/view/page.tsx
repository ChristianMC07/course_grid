interface ViewGridsProps {
    params: {
        id: string,
        index: string,
    }
}

export default function ViewGrids(props: ViewGridsProps) {

    return (
        <div className="min-h-[85vh] bg-gray-100 px-10 pt-10">
            <h1 className="text-3xl font-bold text-gray-800">{props.params.id} - {props.params.index} </h1>
        </div>
    )
}