import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useModal } from "../../../../context/ModalContext";
import ButtonNotLink from "../../atoms/ButtonNotLink";
import HandlerIco from "../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../env";
import { GetToken } from "../../../../service/auth/TokenStorage";
import Subtitle from "../../atoms/text/Subtitle";
import { useNotification } from "../../../../context/NotificationContext";

interface ReportPayProps {
    reloadFn: () => void
}

const ReportPay: FC<ReportPayProps> = ({ reloadFn }) => {
    const { close } = useModal();

    const notification = useNotification();
    const paymentMethodRef = useRef<HTMLSelectElement | null>(null);
    const dateRef = useRef<HTMLInputElement | null>(null);
    const mountRef = useRef<HTMLInputElement | null>(null);

    const [myPayment, setMyPayment] = useState<any[] | null>();

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            if(!paymentMethodRef.current) return notification.init(`Método de págo requerido`, `error`);
            if(!dateRef.current) return notification.init(`Fecha requerida`, `error`);
            if(!mountRef.current) return notification.init(`Monto requerido`, `error`);

            const body = { paymentId:paymentMethodRef.current.value, date:dateRef.current.value, mount:mountRef.current.value };
            const url = `${URL_API}/user/payment/register/create`;
            const result = await fetch(url, { method:`POST`, headers:{token:`${GetToken()}`, "Content-Type":`application/json`},body:JSON.stringify(body) });
            const json = await result.json();
            reloadFn();
            close();
            notification.init(json.message, `success`);
        })()
    }

    useEffect(() => {
        (async () => {
            const url = `${URL_API}/user/payment/?skip=0&take=100`;
            const result = await fetch(url, { headers: { token: `${GetToken()}` } });
            const json = await result.json();
            setMyPayment(json.list);
        })()
    }, [])

    return (
        <div className="w-[30%] bg-base-300 shadow shadow-base-content p-4">

            {
                myPayment && myPayment.length > 0
                    ? <form onSubmit={HandleSubmit} className="grid gap-3">

                        <Subtitle text="Reportar Pago" customClass="text-center font-black text-lg" />

                        <select ref={paymentMethodRef} className="select select-sm focus:outline-none">
                            <option value="">método de pago</option>
                            {
                                myPayment.map(item => (
                                    <option value={item.id}>{item.paymentReference.name}</option>
                                ))
                            }
                        </select>

                        <input ref={dateRef} type="date" className="input input-sm focus:outline-none" />
                        <input ref={mountRef} type="number" step={`any`} className="input input-sm focus:outline-none" />

                        <div className="flex justify-center items-center gap-3">
                            <ButtonNotLink
                                ico={<HandlerIco ico="x" />}
                                click={close}
                                variant="border"
                                color="warning"
                                text="Cancelar"
                            />
                            <ButtonNotLink
                                type="submit"
                                ico={<HandlerIco ico="x" />}
                                color="primary"
                                text="Reportar"
                            />
                        </div>
                    </form>
                    : <div>
                        <Subtitle text="No tienes métodos de pago" />
                    </div>
            }


        </div>
    )
}

export default ReportPay;
