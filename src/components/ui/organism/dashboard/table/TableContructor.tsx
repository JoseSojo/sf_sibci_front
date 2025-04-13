import { FC } from "react";
import TableHeadContructor from "../../../compounds/table/TableHeader";
import TableBodyContructor from "../../../compounds/table/TableBody";
import { ActionSelect, ExtractObject, FnChangeSelect } from "../../../../../types/table/table";
import { ObjectSupport } from "../../../../../types/app";
import { ButtonType } from "../../../../../types/ui/button";

interface TableContructorProps {
    header: string[];
    extract: (ExtractObject | string)[];
    body: any[];
    object: ObjectSupport;
    reload: () => void

    actionsSelect?: ActionSelect[];
    handleActionSelect?: FnChangeSelect;
    actionButton?: ButtonType[];
    actionClickRow?: boolean;
    handleActionClickRow?: (param?: any) => void;
    path?: string; 
}

const TableContructor: FC<TableContructorProps> = ({ path,body, extract, header, actionsSelect, object, reload,actionButton,actionClickRow,handleActionClickRow,handleActionSelect }) => {

    return (
        <div className="overflow-x-auto my-3">
            <table className="table table-zebra">
                <TableHeadContructor header={header} actions={actionsSelect && actionsSelect.length ? true : actionButton && actionButton.length > 0 ? true : false } />
                <TableBodyContructor
                    actionButton={actionButton}
                    actionClickRow={actionClickRow}
                    handleActionClickRow={handleActionClickRow}
                    handleActionSelect={handleActionSelect}
                    reload={reload} 
                    object={object}
                    extract={extract} 
                    body={body}
                    action={actionsSelect}
                    path={path}
                    />
            </table>
        </div>
    )
}

export default TableContructor;
