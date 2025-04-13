import { ChangeEvent, FC, FormEvent, useState } from "react";
import Subtitle from "../../atoms/text/Subtitle";
import HandlerIco from "../../../../service/ui/HandlerIco";
import ButtonNotLink from "../../atoms/ButtonNotLink";
import { useModal } from "../../../../context/ModalContext";

interface UpdatePhotoProps {

}

const UpdatePhoto: FC<UpdatePhotoProps> = () => {

    const { close } = useModal();

    const [file, setFile] = useState<File | null>(null);

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) return;

    }

    return (
        <div className="bg-base-100 rounded-md w-[40%] p-4">
            <Subtitle text="Actualizar Foto de Perfíl" customClass="text-2xl font-bold mb-3" />
            <form onSubmit={HandleSubmit}>
                <label>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Seleccionar Foto</legend>
                        <input onChange={HandleChange} type="file" className="file-input w-full" />
                        <label className="fieldset-label text-xs">Imagen para el perfíl</label>
                    </fieldset>
                </label>
                <div className="flex gap-3">
                    <ButtonNotLink
                        click={close}
                        variant="border"
                        customClass="mt-3"
                        color="warning"
                        text="Cerrar"
                        ico={<HandlerIco ico="update" />}
                    />
                    <ButtonNotLink
                        customClass="mt-3"
                        color="info"
                        text="Actualizar"
                        ico={<HandlerIco ico="update" />}
                    />
                </div>
            </form>
        </div>
    )
}

export default UpdatePhoto;
