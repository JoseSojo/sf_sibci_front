import { ChangeEvent, FC, useState } from "react";
import Subtitle from "../../../../../../components/ui/atoms/text/Subtitle";
import Button from "../../../../../../components/ui/atoms/Button";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import { useModal } from "../../../../../../context/ModalContext";
import DistributionMenuCreate from "./DistirbutionMenu";
import LabelInput from "../../../../../../components/ui/compounds/LabelInput";
import Input from "../../../../../../components/ui/atoms/input/Input";
import { useNavigate } from "react-router-dom";
import { FoodType } from "../../../../../../types/data/food";
import AbstractList from "../../../../abstract/partials/AbstractList";
import ButtonNotLink from "../../../../../../components/ui/atoms/ButtonNotLink";
import { useNotification } from "../../../../../../context/NotificationContext";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import { URL_API } from "../../../../../../env";

export interface FoodSelectUnity extends FoodType {
    unity?: string
}

interface MenuCreateProps { }

const MenuCreate: FC<MenuCreateProps> = ({ }) => {
    const { init } = useModal();
    const navigate = useNavigate();
    const notification = useNotification();

    const [foodSelect, setFoodSelect] = useState<FoodSelectUnity[]>([]);
    const [data, setData] = useState<any>({});

    const [filter, setFilter] = useState(``);
    const [skip, setSkip] = useState(0);
    const [reload, setReload] = useState(false);
    const [take] = useState(10);

    const Reload = () => setReload(!reload);

    const HandleSubmit = () => {

        (async () => {
            if(data.name === 0) return notification.init(`Debes agregar el nombre.`, `warning`);
            if(data.type === 0) return notification.init(`Debes agregar el tipo.`, `warning`);
            if(data.preparation === 0) return notification.init(`Debes describir la preparación.`, `warning`);
            if(foodSelect.length === 0) return notification.init(`Debes seleccionar almenos un alimento.`, `warning`);

            const createData = { name:data.name, preparation:data.preparation, type:data.type, foods:foodSelect  };

            console.log(createData);
            alert(`continue...`);

            const responseFethc = await fetch(`${URL_API}/menu/create`, { 
                method: `POST`,
                headers: {
                    "Content-Type": "application/json",
                    token:`${GetToken()}`,
                },
                body:JSON.stringify(createData),
            });

            const response = await responseFethc.json();

            if(response.statusMessage === `error`) {
                notification.init(response.message, `error`);
                return;
            }

            navigate(-1);
            notification.init(response.message, `success`);
            return;
        })();

    }

    const GetClickFood = (param: FoodType) => {
        setFoodSelect((pr) => {
            const findFound = pr.find(item => item.code === param.code);
            if(findFound) {
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
            prevArray.splice(index, 1);
            return [...prevArray];
        });
    }

    const HandleChangeUnity = (index: number, value: string) => {
        setFoodSelect((pr) => {
            const prevArray = pr ? [...pr] : []; // Copiamos el array anterior
            prevArray[index].unity = value;
            return [...prevArray];
        });
    }

    const HandleChangeData = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData((prev: any) => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    return (
        <div>
            <div className="flex justify-between">
                <Subtitle text="Crear Menú" customClass="text-xl font-black" />
                <ul className="flex gap-3">
                    <li>
                        <Button
                            color="primary"
                            ico={<HandlerIco ico="distribucion" />}
                            text="distibución"
                            click={() => init(<DistributionMenuCreate foods={foodSelect} />)}
                        />
                    </li>
                    <li>
                        <Button
                            color="success"
                            ico={<HandlerIco ico="create" />}
                            text="Crear"
                            click={() => HandleSubmit()}
                        />
                    </li>
                    <li>
                        <Button
                            color="info"
                            click={() => navigate(`/dashboard/menu`)}
                            text="lista"
                        />
                    </li>
                </ul>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-4">
                <LabelInput
                    color="default"
                    label="Nombre"
                >
                    <Input change={HandleChangeData} name="name" customClass="border border-base-300" />
                </LabelInput>
                <LabelInput
                    color="default"
                    label="Tipo"
                >
                    <select onChange={HandleChangeData} name="type" className="select select-sm border-base-300 focus:outline-none w-full">
                        <option value={``}></option>
                        <option>DESAYUNO</option>
                        <option>ALMUERZO</option>
                        <option>MERIENDA</option>
                        <option>CENA</option>
                    </select>
                </LabelInput>

                <LabelInput
                    customClass="col-span-2"
                    color="default"
                    label="Preparación"
                >
                    <textarea onChange={HandleChangeData} name="preparation" className="input border-base-300 focus:outline-none w-full min-h-20 max-h-32"></textarea>
                </LabelInput>

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
                                size:`xs`
                            }
                        ]}
                        filter={filter}
                        nextFn={() => setSkip(skip+take)} 
                        object="food" 
                        prevFn={()=>setSkip(skip-take)} 
                        reload={reload} 
                        reloadFn={Reload} 
                        skip={skip} 
                        take={take}
                        />
                </div>

                <div className="">
                    {
                        foodSelect && <table className="table table-xs">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>Código</td>
                                    <td>Nombre</td>
                                    <td>Medida</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    foodSelect.map((item, i) => (
                                        <tr className="py-1 top-0 relative h-auto">
                                            <td>
                                                <ButtonNotLink
                                                    size="xs"
                                                    click={()=>RemoveClickFood(i)}
                                                    ico={<HandlerIco ico="x" />}
                                                    variant="border"
                                                    color="error"
                                                />
                                            </td>
                                            <td>{item.code}</td>
                                            <td>{item.name}</td>
                                            <td><Input size="sm" value={item.unity} change={(e)=>HandleChangeUnity(i, e.target.value)} customClass="w-full border border-neutral" placeholder="Describe la unidad de medida" /></td>
                                        </tr>
                                    ))   
                                }
                            </tbody>
                        </table>
                    }
                </div>

            </form>
        </div>
    )
}

export default MenuCreate;
