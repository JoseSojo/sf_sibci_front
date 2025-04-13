import { FC, useEffect, useState } from "react";
import { ObjectSupport } from "../../../../types/app";
import { Form } from "../../../../types/form/form";
import AbstractForm from "./AbstractForm";
import Text from "../../../../components/ui/atoms/text/Text";
import ExecuteRequetsGet from "../../../../service/requets/ExecuteRequetsGet";

interface CreateFormProps {
    use: `pag` | `modal`;
    object: ObjectSupport;
    action: `create` | `update`;
    reload: () => void;
    parentId?: string;
    id?: string;
}

const CreateForm: FC<CreateFormProps> = ({ action, object, reload,parentId,id }) => {
    const [load, setLoad] = useState(true);
    const [form, setForm] = useState<Form | null>();
    const [initData, setInitData] = useState<any | null>(null);

    useEffect(() => {
        (async () => {
            const url = id ? `/${object}/gui/form/${action}/${id}/?parentId=${parentId}` : `/${object}/gui/form/${action}/?parentId=${parentId}`
            const result = await ExecuteRequetsGet({ path:url, token:true }) as any;
            if(result.statusMessage === `error`) {
                setLoad(false);
            }
            else {
                const form = result.body as Form;
                const data = result.data as any;

                setForm(form);
                setInitData(data ? data : null);
                setLoad(false);
            }
        })()
    }, [])

    return load
        ? <div className="bg-base-300 w-[50%] skeleton py-8 flex justify-center items-center rounded-lg">
            <span className="skeleton">cargando...</span>
        </div>
        : form && (
            <div className="w-[50%] bg-base-100 p-5 rounded-lg">
                {form ? <AbstractForm id={parentId} init={initData} reload={reload} form={form} /> : <Text text="No se optuvieron resultados" customClass="text-sm" />}
            </div>
        );
}

export default CreateForm;
