import { FC } from "react"
import AbstractList from "../../../../../../app/auth/abstract/partials/AbstractList"
import Subtitle from "../../../../atoms/text/Subtitle";
import { useNavigate, useParams } from "react-router-dom";
import { URL_API } from "../../../../../../env";
import { useNotification } from "../../../../../../context/NotificationContext";
import { GetToken } from "../../../../../../service/auth/TokenStorage";

interface AssingObjectProps {}

const AssingObject: FC<AssingObjectProps> = ({}) => {

    const { object, id } = useParams() as { object:string, id:string }    
    const notification = useNotification();
    const navigate = useNavigate();

    const HandleRequets = (item: any) => {
        (async () => {
            const url = `${URL_API}/consult/${object}/${id}/assing/${item.id}`;
            alert(url);
            const result = await fetch(url, { method:`POST`, headers:{ token:`${GetToken()}` } });
            const json = await result.json();
            notification.init(json.message, json.statusMessage);
            navigate(-1);

        })()
    }

    return (
        <div className="rounded p-3 bg-base-300 shadow">
            <Subtitle text="Asiganar" customClass="" />
            <AbstractList
                actionButton={[{ text:`asignar`, color:`accent`, customClass:`btn-sm`, click:HandleRequets}]}
                filter=""
                nextFn={() => {}}
                prevFn={() => {}}
                object={object}
                reload
                reloadFn={() => {}}
                skip={0}
                take={10}
            />
        </div>
    )
}

export default AssingObject;
