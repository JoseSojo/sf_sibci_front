import { ChangeEvent, FC } from "react";
import { ActionSelect, ExtractObject, FnChangeSelect } from "../../../../types/table/table";
import ExtractValue from "../../../../utils/handler/ExtractValue";
import { useModal } from "../../../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import AbstractDelete from "../../../../app/auth/abstract/partials/AbstractDelete";
import { ObjectSupport } from "../../../../types/app";
import CreateForm from "../../../../app/auth/abstract/partials/CreateForm";
import { ButtonType } from "../../../../types/ui/button";
import ButtonNotLink from "../../atoms/ButtonNotLink";

interface TableBodyContructorProps {
    body: any[];
    extract: (ExtractObject | string)[];
    action?: ActionSelect[];
    actionFn?: FnChangeSelect;
    object: ObjectSupport;
    reload: () => void;

    actionsSelect?: ActionSelect[];
    handleActionSelect?: FnChangeSelect;
    actionButton?: ButtonType[];
    actionClickRow?: boolean;
    handleActionClickRow?: (param?: any) => void;
    path?: string; 
}

const TableBodyContructor: FC<TableBodyContructorProps> = ({ path,body, extract, action, object, reload,actionButton }) => {

    const { init, close } = useModal();
    const navigate = useNavigate();

    const clsCell = `text-gray-700 dark:text-white font-light text-center py-1 text-xs`;
    const clsRow = `text-gray-700 dark:text-white font-light border-base-content text-center py-1`;

    const HandleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const spl = e.target.value.split(`-----`);
        const spl0 = spl[0] as `create` | `update` | `delete` | `unique`;
        const spl1 = spl[1] as `pag` | `modal`;
        const spl2 = spl[2] as string;
        if (spl1 === `modal`) HandleChangeSelectModal(spl2, spl0);
        else HandleChangeSelectPag(spl2, spl0)
    }

    const HandleChangeSelectModal = (id: string, action: `create` | `update` | `delete` | `unique`) => {
        if (action === `delete`) {
            return init(<AbstractDelete reload={reload} close={close} id={id} object={object} />)
        }
        if (action === `update`) {
            return init(<CreateForm id={id} reload={reload} action="update" object={object} use="modal" />)

        }
        if (action === `unique`) { }
    }

    const HandleChangeSelectPag = (id: string, action: `create` | `update` | `delete` | `unique`) => {
        const location = window.location.pathname;
        if (action === "unique") navigate(`${path ? path : location}/${id}`);
        else {

        }
    }

    return (
        <tbody>
            {
                body.map(item => {
                    return <tr className={clsRow}>
                        {
                            !actionButton && action && action.length > 0 && <td>
                                <select
                                    onChange={HandleChangeSelect}
                                    className="select select-xs border border-base-content outline-none focus:outline-none"
                                >
                                    <option>seleccionar</option>
                                    {
                                        action.map(itemAction => (
                                            <option value={`${itemAction.ico}-----${itemAction.use}-----${item.id}`}>{itemAction.label}</option>
                                        ))
                                    }
                                </select>
                            </td>
                        }
                        { 
                            actionButton && 
                            actionButton.map(btn => (
                                <ButtonNotLink 
                                    {...btn} 
                                    click={() => {
                                        if(btn.click) btn.click(item);
                                    }}
                                />
                            ))
                        }
                        {
                            extract.map(extract => (
                                <td className={clsCell}><ExtractValue extractBy={extract} item={item} /></td>
                            ))
                        }
                    </tr>
                })
            }
        </tbody>
    )
}

export default TableBodyContructor;
