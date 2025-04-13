import { FC, useCallback, useEffect, useState } from "react";
import { ObjectSupport } from "../../../../types/app";
import { GetActionRow, GetExtractLabel, GetHeaderLabel, GetListCrud } from "../../../../service/crud/HandleCrud";
import { ActionSelect, customString, ExtractObject, FnChangeSelect } from "../../../../types/table/table";
import TableContructor from "../../../../components/ui/organism/dashboard/table/TableContructor";
import TablePagination from "../../../../components/ui/compounds/table/TablePagination";
import { PaginationType } from "../../../../types/pagination";
import { ButtonType } from "../../../../types/ui/button";

interface AbstractListProps {
    object: ObjectSupport;
    skip: number, 
    nextFn: () => void, 
    take: number,
    prevFn: () => void,
    reload: boolean,
    reloadFn: () => void,
    query?: string,
    filter: string,
    header?: string[],
    extract?: (ExtractObject | string)[],

    actionsSelect?: ActionSelect[];
    handleActionSelect?: FnChangeSelect;
    actionButton?: ButtonType[];
    actionClickRow?: boolean;
    handleActionClickRow?: (param?: any) => void;
    path?: string
}

const AbstractList: FC<AbstractListProps> = ({ 
    filter,object, skip, take, reload, nextFn, prevFn, reloadFn,query,
    actionButton,
    actionClickRow,
    handleActionClickRow,
    handleActionSelect,
    path
}) => {

    const [header, setHeader] = useState<customString | null>(null);
    const [extract, setExtract] = useState<(ExtractObject | string)[] | null>(null);
    const [body, setBody] = useState<any[] | null>(null);
    const [actions, setActions] = useState<ActionSelect[] | null>(null);
    const [pagination, setPagination] = useState<PaginationType | null>();

    // header
    useEffect(() => {
        const Execute = async () => {
            if (header !== null) return;
            const response = await GetHeaderLabel({ object });
            setHeader(response);
        }
        Execute();
    }, [])

    // extract
    useEffect(() => {
        const Execute = async () => {
            if (extract !== null) return;
            const response = await GetExtractLabel({ object });
            setExtract(response);
        }
        Execute();
    }, [])

    const ExecuteRequets = useCallback(async (cfilter: string, cskip:number, ctake:number) => {
        // if (body !== null) return;
        const response = await GetListCrud({ object, skip:cskip, take:ctake, query: `${query}&param=${cfilter}` });
        setBody(response.list);
        setPagination(response.pagination);
    }, [])

    // lista
    useEffect(() => {
        const handler = setTimeout(() => ExecuteRequets(filter ? filter : ``, skip, take), 500);
        return () => {
            clearTimeout(handler);
        };
    }, [reload, skip, take,filter])

    // action rows
    useEffect(() => {
        const Execute = async () => {
            if (actions !== null) return;
            const response = await GetActionRow({ object });
            setActions(response);
        }
        Execute()
    }, [])

    return (
        <>
            {
                header && extract && body && actions && pagination &&
                <div className="px-5">

                    <TableContructor
                        reload={reloadFn}
                        object={object}
                        header={header}
                        extract={extract}
                        body={body}
                        actionsSelect={actions}

                        actionButton={actionButton}
                        actionClickRow={actionClickRow}
                        handleActionClickRow={handleActionClickRow}
                        handleActionSelect={handleActionSelect}
                        path={path}
                    />

                    <TablePagination nextFn={nextFn} prevFn={prevFn} pagination={pagination} />
                </div>

            }
        </>
    )
}

export default AbstractList;
