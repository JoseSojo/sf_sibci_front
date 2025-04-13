import { FC, useEffect, useState } from "react";
// import CardGraphic from "../../components/ui/compounds/card/CardGraphic";
import Subtitle from "../../components/ui/atoms/text/Subtitle";
import { URL_API } from "../../env";
import { GetToken } from "../../service/auth/TokenStorage";
import Button from "../../components/ui/atoms/Button";
import HandlerIco from "../../service/ui/HandlerIco";
import { useModal } from "../../context/ModalContext";
import AbstractForm from "./abstract/partials/AbstractForm";
import { FormUpdateData, FormUpdatePassword } from "../../types/form/profile.form";
import UpdatePhoto from "../../components/ui/organism/form/UpdatePhoto";
import SectionStatictics from "../../components/ui/organism/sections/SectionStatictics";

const ProfilePage: FC = ({ }) => {

    const { init } = useModal();

    const [data, setData] = useState<any | null>(null);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        (async () => {
            const url = `${URL_API}/profile/gui`;
            const result = await fetch(url, { headers: { token: `${GetToken()}` } });
            const json = await result.json();
            setData(json.body);
        })()
    }, [reload])

    const ExecuteUpdateModal = () => {
        const form = FormUpdateData(data);

        return init(<div className="bg-base-300 p-4 rounded-md"><AbstractForm init={data} form={form} reload={()=>setReload(!reload)} /></div>)
    }

    const ExecutePasswordModal = () => {
        const form = FormUpdatePassword();

        return init(<div className="bg-base-300 p-4 rounded-md"><AbstractForm form={form} reload={()=>setReload(!reload)} /></div>)
    }

    const ExecutePhotoModal = () => {
        return init(<UpdatePhoto />)
    }

    return (
        <div className="px-3">
            {
                data
                    ? <>
                        <div className="w-full px-5 py-3 rounded-xl bg-base-300">
                            <div className="flex gap-4 justify-start items-center mb-5">
                                <div className="avatar aspect-square w-48">
                                    {/* <Image alt="" customClass="rounded-xl" h={50} w={50} src="/profile.jpg" /> */}
                                </div>
                                <div className="w-full">
                                    <Subtitle text={`Perfil: ${data ? `${data.name} ${data.lastname}` : ``}`} size="3xl" customClass="font-black" />
                                    <table className="table table-zebra w-full">
                                        <tbody>
                                            <tr>
                                                <td>Nombre: <b>{data.name ? data.name : ``}</b></td>
                                                <td>Apellido: <b>{data.lastname ? data.lastname : ``}</b></td>
                                                <td>Edad: <b>{data.age ? data.age : ``}</b></td>
                                            </tr>
                                            <tr>
                                                <td>Correo: <b>{data.email ? data.email : ``}</b></td>
                                                <td>Teléfono: <b>{data.phone ? data.phone : ``}</b></td>
                                                <td>Dirección: <b>{data.address ? data.address : ``}</b></td>
                                            </tr>
                                            <tr>
                                                <td>Usuario: <b>{data.username ? data.username : ``}</b></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>F. Creación: <b>{data.createAt ? data.createAt : ``}</b></td>
                                                <td>U. Actualización <b>{data.createAt ? data.createAt : ``}</b></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="w-full flex justify-start gap-5 mt-3">
                                        <Button
                                            click={ExecuteUpdateModal}
                                            color="primary"
                                            customClass="font-bold"
                                            ico={<HandlerIco ico="update" />}
                                            text="Datos"
                                        />
                                        <Button
                                            click={ExecutePasswordModal}
                                            color="warning"
                                            customClass="font-bold"
                                            ico={<HandlerIco ico="secure" />}
                                            text="Contraseña"
                                        />
                                        <Button
                                            click={ExecutePhotoModal}
                                            color="info"
                                            customClass="font-bold"
                                            ico={<HandlerIco ico="image" />}
                                            text="Foto"
                                        />
                                    </div>
                                </div>
                            </div>

                            <SectionStatictics reload path="profile" />

                        </div>
                    </>
                    : <>

                    </>
            }
        </div>
    )
}

export default ProfilePage;
