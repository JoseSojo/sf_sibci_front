import { FC, useEffect, useState } from "react";
import { FoodType } from "../../../../../../types/data/food";
import AbstractList from "../../../../abstract/partials/AbstractList";
import Input from "../../../../../../components/ui/atoms/input/Input";
import { useNotification } from "../../../../../../context/NotificationContext";
import ButtonNotLink from "../../../../../../components/ui/atoms/ButtonNotLink";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import Subtitle from "../../../../../../components/ui/atoms/text/Subtitle";
import { URL_API } from "../../../../../../env";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import { FoodWithRequets } from "./ExchangeFicha";

interface MenuCreateProps {
    foods: FoodWithRequets[];
    reloadParent: () => void;
    id: string
}

const AddFoodInFicha: FC<MenuCreateProps> = ({ foods,reloadParent,id }) => {

    const notification = useNotification();
    const [reload, setReload] = useState(true);
    const [filter, setFilter] = useState(``);
    const [skip, setSkip] = useState(0);
    const [take] = useState(10);
    const [foodSelect, setFoodSelect] = useState<any[]>(foods.map(item => {return{...item.foodReference}}));
    const [listDelete, setListDelete] = useState<any[]>([])

    useEffect(() => setFoodSelect(foods.map(item => {return{...item.foodReference}})), [foods]);

    const GetClickFood = (param: FoodType) => {
        setFoodSelect((pr) => {
            const findFound = pr.find(item => item.id === param.id);
            if (findFound) {
                notification.init(`${param.name}, ya seleccionado`, `info`)
                return [...pr];
            }

            const prevArray = pr ? [...pr] : []; // Copiamos el array anterior
            return [...prevArray, param];
        });
    }

    const RemoveClickFood = (index: number) => {
        setFoodSelect((pr) => {
            const prevArray = pr ? [...pr] : []; // Copiamos el array anterior
            const found = foods.find(fd => fd.foodReference.id === pr[index].id);
            if(found) {
                setListDelete((prev) => {
                    return [...prev, pr[index]];
                })
            }
            prevArray.splice(index, 1);
            return [...prevArray];
        });
    }

    const Reload = () => {
        setReload(!reload);   
        return reloadParent();
    }

    const UpdateFood = () => {
        (async() => {
            const body = {
                add: foodSelect,
                delete: listDelete
            }
            const url = `${URL_API}/exchange/detail/${id}/manage`;
            alert(url);
            const result = await fetch(url, {
                method: `PUT`,
                headers: {
                    "Content-Type":"application/json",
                    token: `${GetToken()}`
                },
                body: JSON.stringify(body)
            });
            const json = await result.json();
            console.log(json);
        })()
    }

    return (
        <div className="grid grid-cols-2 p-3 rounded bg-base-200">
            <div className="col-span-2 flex justify-between">
                <Subtitle customClass="col-span-2 text-center text-xl mb-3 font-bold" text="Modificar Alimentos" />
                <ButtonNotLink click={UpdateFood} ico={<HandlerIco ico="create" />} text="Guardar" color="info" />
            </div>
            <div>
                <label className="flex items-center justify-end gap-3 px-3">
                    <span className="font-black text-sm">Buscar</span>

                    <Input
                        change={(e) => setFilter(e.target.value)}
                        customClass="border border-primary"
                    />
                </label>
                <AbstractList
                    actionButton={[
                        {
                            click: GetClickFood,
                            color: `primary`,
                            ico: `add`,
                            variant: `border`,
                            customClass: `btn-xs`,
                            size: `xs`
                        }
                    ]}
                    filter={filter}
                    nextFn={() => setSkip(skip + take)}
                    object="efood"
                    prevFn={() => setSkip(skip - take)}
                    reload={reload}
                    reloadFn={Reload}
                    skip={skip}
                    take={take}
                />
            </div>
            <div className="">
                {
                    foodSelect && foodSelect.length > 0 && <table className="table table-xs">
                        <thead>
                            <tr>
                                <td></td>
                                <td>Nombre</td>
                                <td>Categoría</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                foodSelect.map((item, i) => (
                                    <tr className="py-1 top-0 relative h-auto">
                                        <td>
                                            <ButtonNotLink
                                                size="xs"
                                                click={() => {
                                                    RemoveClickFood(i)
                                                }}
                                                ico={<HandlerIco ico="x" />}
                                                variant="border"
                                                color="error"
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default AddFoodInFicha;
