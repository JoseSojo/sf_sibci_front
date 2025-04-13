import { FC } from "react";

interface TableHeadContructorProps {
    header: string[];
    actions?: boolean
}

const TableHeadContructor: FC<TableHeadContructorProps> = ({ header,actions }) => {

    return (
        <thead>
            <tr className="text-center text-black dark:text-white">
                {
                    actions && <th className="text-xs font-black border-b border-primary bg-gradient-to-b from-transparent to-primary/10"></th>
                }
                {
                    header.map((th) => (
                        <th className="text-xs font-black border-b border-primary bg-gradient-to-b from-transparent to-primary/10">{th}</th>
                    ))
                }
            </tr>
        </thead>
    )
}

export default TableHeadContructor;
