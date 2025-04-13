import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AbstractCrudFichaInit from "../../../../abstract/AbstractCrudFichaInit";
import { FoodExchangeType } from "../../../../../../types/data/food";
import DistributionMenuCreate from "./DistirbutionMenu";
import { URL_API } from "../../../../../../env";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import AddFoodInFicha from "./AddFood";

interface ExchangeCreateProps {
}

export interface FoodWithRequets {
    id: string;
    foodReference: FoodExchangeType,
}

const ExchangeFicha: FC<ExchangeCreateProps> = ({ }) => {
    const { id } = useParams() as { id: string };

    const [load,setLoad] = useState(true);
    const [foods, setFoods] = useState<FoodWithRequets[]>([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        (async () => {
            setLoad(true);
            const url = `${URL_API}/exchange/${id}/foods`;
            const response = await fetch(url, { headers:{token:`${GetToken()}`} });
            const json = await response.json();
            setFoods(() => json.body);
            setLoad(false);
        })()
    }, [reload]);


    return (
        <div className="">
            <AbstractCrudFichaInit id={id} object="exchange" />
            <div className="mt-5"></div>
            {
                load 
                ? <div className="py-3 flex justify-center items-center w-full"><span className="loading loading-spinner"></span></div>
                : <>{
                    foods && foods.length > 0 &&
                    <div className="grid grid-cols-2 my-5 p-3 rounded bg-base-200">
                        {
                            <table className="table table-xs">
                                <thead className="bg-base-200 text-base-content">
                                    <tr>
                                        <td>Alimento</td>
                                        <td>Caloria</td>
                                        <td>Categoría</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        foods.map((item) => (
                                            <tr key={item.foodReference.id} className="py-0">
                                                <td>{item.foodReference.name}</td>
                                                <td>{item.foodReference.caloria}</td>
                                                <td>{item.foodReference.category}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                        <DistributionMenuCreate foods={foods.map(item => item.foodReference)} screen />
                    </div>
                }</>
            }
            <AddFoodInFicha id={id} foods={foods} reloadParent={() => setReload(!reload)} />

        </div>
    )
}

export default ExchangeFicha;
