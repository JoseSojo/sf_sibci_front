import { ChangeEvent, FC, FormEvent, useState } from "react";
import ContainerModal from "./ContainerModal";
import ButtonNotLink from "../../../../atoms/ButtonNotLink";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../../../env";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import { DistribucionCalorica } from "../nutrition/patient/data";
import Input from "../../../../atoms/input/Input";
import { useNotification } from "../../../../../../context/NotificationContext";
import { useModal } from "../../../../../../context/ModalContext";

type UseTypeComponent = DistribucionCalorica

interface Props {
    data?: UseTypeComponent;
    id: string;
    patientId: string;
    reload: () => void
}

type ProteCarboLipido = { percentage: number; kiloCaloria: number; gramos: number; raciones: number; };

const DistribucionCaloricaComponent: FC<Props> = ({ data, id, patientId, reload }) => {

    const { close } = useModal();
    const notification = useNotification();
    const title = `Distribucion Calórica`;
    const path = `distribucioncalorica`;

    const [prote, setProte] = useState<ProteCarboLipido>(data ? data.proteina : { gramos: 0, kiloCaloria: 0, percentage: 0, raciones: 0 });
    const [lipid, setLipid] = useState<ProteCarboLipido>(data ? data.lipidos : { gramos: 0, kiloCaloria: 0, percentage: 0, raciones: 0 });
    const [carbo, setCarbo] = useState<ProteCarboLipido>(data ? data.carbohidratos : { gramos: 0, kiloCaloria: 0, percentage: 0, raciones: 0 });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            // if(!patient) return;

            if(!prote.percentage) return notification.init(`Debes agregar el Porcentaje de Proteina`, `error`);
            if(!prote.gramos) return notification.init(`Debes agregar el Gramos de Proteina`, `error`);
            if(!prote.kiloCaloria) return notification.init(`Debes agregar el KiloCalorias de Proteina`, `error`);
            if(!prote.raciones) return notification.init(`Debes agregar el Raciones de Proteina`, `error`);

            if(!lipid.percentage) return notification.init(`Debes agregar el Porcentaje de Lípidos`, `error`);
            if(!lipid.gramos) return notification.init(`Debes agregar el Gramos de Lípidos`, `error`);
            if(!lipid.kiloCaloria) return notification.init(`Debes agregar el KiloCalorias de Lípidos`, `error`);
            if(!lipid.raciones) return notification.init(`Debes agregar el Raciones de Lípidos`, `error`);

            if(!carbo.percentage) return notification.init(`Debes agregar el Porcentaje de Carbohidratos`, `error`);
            if(!carbo.gramos) return notification.init(`Debes agregar el Gramos de Carbohidratos`, `error`);
            if(!carbo.kiloCaloria) return notification.init(`Debes agregar el KiloCalorias de Carbohidratos`, `error`);
            if(!carbo.raciones) return notification.init(`Debes agregar el Raciones de Carbohidratos`, `error`);

            const url = `${URL_API}/consult/patient/${path}/${id}/?patientId=${patientId}`;
            const body: UseTypeComponent = { carbohidratos: carbo, lipidos: lipid, proteina: prote };

            console.log(body);
            alert(url);

            const result = await fetch(url, {
                method: `POST`,
                headers: { token: `${GetToken()}`, "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const json = await result.json();
            if (json.status === 200) { }
            reload();
        })()
    }

    const HandleChangeProte = (e: ChangeEvent<HTMLInputElement>) => {
        setProte(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const HandleChangeLipid = (e: ChangeEvent<HTMLInputElement>) => {
        setLipid(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const HandleChangeCarbo = (e: ChangeEvent<HTMLInputElement>) => {
        setCarbo(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    return (
        <ContainerModal customClass="w-[70%] bg-base-100 p-3 rounded" title={title}>
            <form onSubmit={HandleSubmit} className="grid grid-cols-1 gap-3">

                <table className="table table-sm table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>%</th>
                            <th>Kilo Calorias</th>
                            <th>Gramos</th>
                            <th>Raciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Proteínas</td>
                            <td><Input change={HandleChangeProte} name="percentage" value={prote.percentage.toString()} /></td>
                            <td><Input change={HandleChangeProte} name="kiloCaloria" value={prote.kiloCaloria.toString()} /></td>
                            <td><Input change={HandleChangeProte} name="gramos" value={prote.gramos.toString()} /></td>
                            <td><Input change={HandleChangeProte} name="raciones" value={prote.raciones.toString()} /></td>
                        </tr>
                        <tr>
                            <td>Lípidos</td>
                            <td><Input change={HandleChangeLipid} name="percentage" value={lipid.percentage.toString()} /></td>
                            <td><Input change={HandleChangeLipid} name="kiloCaloria" value={lipid.kiloCaloria.toString()} /></td>
                            <td><Input change={HandleChangeLipid} name="gramos" value={lipid.gramos.toString()} /></td>
                            <td><Input change={HandleChangeLipid} name="raciones" value={lipid.raciones.toString()} /></td>
                        </tr>
                        <tr>
                            <td>Carbohidratos</td>
                            <td><Input change={HandleChangeCarbo} name="percentage" value={carbo.percentage.toString()} /></td>
                            <td><Input change={HandleChangeCarbo} name="kiloCaloria" value={carbo.kiloCaloria.toString()} /></td>
                            <td><Input change={HandleChangeCarbo} name="gramos" value={carbo.gramos.toString()} /></td>
                            <td><Input change={HandleChangeCarbo} name="raciones" value={carbo.raciones.toString()} /></td>
                        </tr>
                    </tbody>
                </table>

                <div className="col-span-4 flex justify-end gap-3 mt-4">
                    <ButtonNotLink
                        click={close}
                        color="error"
                        text="cerrar"
                        ico={<HandlerIco ico="x" />}
                    />
                    <ButtonNotLink
                        type="submit"
                        color="success"
                        text="guardar"
                        ico={<HandlerIco ico="create" />}
                    />
                </div>
            </form>
        </ContainerModal>
    )
}

export default DistribucionCaloricaComponent;
