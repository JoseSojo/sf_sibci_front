import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Form } from "../../../../types/form/form";
import Subtitle from "../../../../components/ui/atoms/text/Subtitle";
import Input from "../../../../components/ui/atoms/input/Input";
import ButtonNotLink from "../../../../components/ui/atoms/ButtonNotLink";
import { BsFillSendFill } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useModal } from "../../../../context/ModalContext";
import Text from "../../../../components/ui/atoms/text/Text";
import { ExecuteRequetsPost } from "../../../../service/requets/ExecuteRequetsPost";
import { GetToken } from "../../../../service/auth/TokenStorage";
import { URL_API } from "../../../../env";
import { useNotification } from "../../../../context/NotificationContext";
import SelectApi from "../../../../components/ui/organism/form/select/SelectApi";

interface AbstractFormProps {
    form: Form;
    reload: () => void;
    init?: any | null;
    id?: string
}

const AbstractForm: FC<AbstractFormProps> = ({ form, reload, init,id }) => {
    const { close } = useModal();
    const notification = useNotification();

    const [data, setData] = useState<any>(init ? init : {});

    const HandleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const prev = { ...data, [e.target.name]: e.target.value };
        setData(prev);
    }

    const CustomChange = ({ name,value }: {name: string, value: string}) => {
        const prev = { ...data, [name]: value };
        setData(prev);
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            const url = `${URL_API}${form.path}${id ? `?id=${id}` : ``}`;
            alert(url);
            const result = await ExecuteRequetsPost({ update:form.method === `PUT` ? true : false, body: data, url, token: `${GetToken()}`, type: `application/json` });
            if (result.statusMessage === `error`) {
                return notification.init(`Error temporal`, `error`);
            }
            // notificación
            notification.init(form.method === `POST` ? `Creación Exitosa` : `Actualización Exitoza`, `success`);

            reload();
            setData({});
            close();
            return;        
        })()
    }

    return (
        <form onSubmit={HandleSubmit}>
            <Subtitle text={form.label} customClass="text-start font-semibold text-xl" />
            <div className="grid gap-3 lg:grid-cols-2 my-3">
                {
                    form.fields.map((field) => {
                        if (field.type == `select-api`) {
                            const item = field.field;
                            return <SelectApi change={CustomChange} id={id} field={item} path={field.path} type={field.type} />
                        }

                        if (field.type == `select`) {
                            const item = field.field;
                            return <label>
                                <Text text={item.label} customClass="text-xs font-black" />
                                <select onChange={HandleChange} name={item.name} className="select select-sm w-full outline-none focus:outline-none border border-primary">
                                    <option value={`${data[item.name]}`}>{data[item.name]}</option>
                                    {
                                        item.options.map(op => (
                                            <option value={op.value}>{op.label}</option>
                                        ))
                                    }
                                </select>
                            </label>
                        }

                        if (field.type == `textarea`) {
                            const item = field.field;
                            return <label className="col-span-2">
                                <textarea onChange={HandleChange} name={item.name} key={item.key} className={`${item.customClass} text-sm col-span-2 w-full input input-sm border border-primary min-h-16 max-h-24`}>{item.value}</textarea>
                            </label>
                        }

                        if (field.type == `input`) {
                            const item = field.field;
                            return <label>
                                <Text text={item.label} customClass="text-xs font-black" />
                                <Input type={field.field.type} value={data[item.name]} color="primary" name={item.name} placeholder={item.placeholder} change={HandleChange} regex={item.validation} />
                            </label>
                        }
                    })
                }
            </div>
            <div className="flex gap-3">
                <ButtonNotLink
                    click={close}
                    color="warning"
                    variant="border"
                    ico={<IoIosCloseCircleOutline />}
                    text={`Cancelar`}
                />
                <ButtonNotLink
                    color="primary"
                    type="submit"
                    customClass="flex-[.3]"
                    ico={<BsFillSendFill />}
                    text={form.method === `POST` ? `Crear` : form.method === `PUT` ? `Actualizar` : `Enviar`}
                />
            </div>
        </form>
    )
}

export default AbstractForm;
