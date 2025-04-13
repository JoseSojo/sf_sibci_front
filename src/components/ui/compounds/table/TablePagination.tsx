import { FC } from "react";
import Text from "../../atoms/text/Text";
import { PaginationType } from "../../../../types/pagination";
import ButtonNotLink from "../../atoms/ButtonNotLink";

interface TablePaginationProps {
    pagination: PaginationType;
    prevFn: () => void;
    nextFn: () => void;
}

const TablePagination: FC<TablePaginationProps> = ({ pagination, nextFn, prevFn }) => {

    return (
        <div className=" w-full flex justify-end mt-2">
            <div className="join">
                {
                    pagination.previw
                    ? <ButtonNotLink text="«" variant="button" color="primary" click={prevFn} />
                    : <ButtonNotLink text="«" variant="border" color="default" />
                }
                <Text text={`${pagination.now} / ${pagination.count}`} customClass="join-item btn btn-sm" />
                {
                    pagination.next
                    ? <ButtonNotLink text="»" variant="button" color="primary" click={nextFn} />
                    : <ButtonNotLink text="»" variant="border" color="default" />
                }
            </div>
        </div>
    )
}

export default TablePagination;
