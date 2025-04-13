import { FC } from "react";

interface CrudSkeletonProps { }

const CrudSkeleton: FC<CrudSkeletonProps> = ({ }) => {

    return (
        <div className="grid gap-3" >
            <div className="grid grid-cols-[.75fr_.25fr] gap-3" >
                <div className="p-5 w-full rounded-lg skeleton" > </div>
                < div className="grid grid-cols-4 gap-3" >
                    <div className="p-5 w-full rounded-lg skeleton" > </div>
                    < div className="p-5 w-full rounded-lg skeleton" > </div>
                    < div className="p-5 w-full rounded-lg skeleton" > </div>
                    < div className="p-5 w-full rounded-lg skeleton" > </div>
                </div>
            </div>
            < div className="h-72 w-full rounded-lg skeleton" > </div>
            < div className="grid grid-cols-[.70fr_.30fr] gap-3" >
                <div></div>
                < div className="grid grid-cols-[.5fr_1fr_.5fr] gap-3" >
                    <div className="p-5 w-full rounded-lg skeleton" > </div>
                    < div className="p-5 w-full rounded-lg skeleton" > </div>
                    < div className="p-5 w-full rounded-lg skeleton" > </div>
                </div>
            </div>
        </div>
    )
}

export default CrudSkeleton;
