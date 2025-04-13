import { FC } from "react";
import { useParams } from "react-router-dom";
import AbstractCrudFichaInit from "./abstract/AbstractCrudFichaInit";

interface AdminSubscriptionFichaProps { }

const AdminSubscriptionFicha: FC<AdminSubscriptionFichaProps> = ({ }) => {

    const { id } = useParams() as { id:string }

    return (
        <div>
            <AbstractCrudFichaInit object="user/subscription" id={id} />
        </div>
    )
}

export default AdminSubscriptionFicha;
