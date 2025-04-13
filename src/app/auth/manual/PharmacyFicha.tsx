import { FC } from "react";
import { useParams } from "react-router-dom";
import AbstractCrudFichaInit from "../abstract/AbstractCrudFichaInit";
import AbstractCrudInit from "../abstract/AbstractCrudInit";

interface PharmacyFichaProps { }

const PharmacyFicha: FC<PharmacyFichaProps> = () => {

    const { id } = useParams() as { id: string };

    return (<>
        <div className="tabs tabs-lift">
            <input type="radio" name="my_tabs_3" className="tab" aria-label="Ficha" />
            <div className="tab-content bg-base-100 border-base-300 p-6"><AbstractCrudFichaInit id={id} object="pharmacy" /></div>

            <input type="radio" name="my_tabs_3" className="tab" aria-label="Suplementos" defaultChecked />
            <div className="tab-content bg-base-100 border-base-300 p-6"><AbstractCrudInit id={id} object="pharmacy/presentation" /></div>

        </div>
    </>
    )
}

export default PharmacyFicha;
