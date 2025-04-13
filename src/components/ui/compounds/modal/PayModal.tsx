import { FC, useEffect, useState } from "react";
import ButtonNotLink from "../../atoms/ButtonNotLink";
import HandlerIco from "../../../../service/ui/HandlerIco";
import Subtitle from "../../atoms/text/Subtitle";
import { URL_API } from "../../../../env";
import { GetToken } from "../../../../service/auth/TokenStorage";
import { useNotification } from "../../../../context/NotificationContext";
import { useModal } from "../../../../context/ModalContext";
import Text from "../../atoms/text/Text";
import ReportPay from "./ReportPay";

interface PayModalProps { }

const PayModal: FC<PayModalProps> = () => {
    const { close,init } = useModal();

    const notification = useNotification();

    const [payment, setPayment] = useState<any | null>(null);
    const [customPayment, setCustomPayment] = useState<any | null>(null);

    const [myPayment, setMyPayment] = useState<any[] | null>();

    const HandleCustomPayment = () => {
        if (!myPayment) return;
        if (!payment) return notification.init(`Seleciona un método de pago`, `error`);

        const find = myPayment.find(item => item.id === payment);
        setCustomPayment(find);
    }

    const HandleReportExecute = () => {
        return init(<ReportPay reloadFn={() => {}} />)
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
                    ? customPayment
                        ? <div className="grid gap-3">

                            <Subtitle text="Pagar" customClass="text-center font-black text-lg" />
                            <Subtitle text={`Método seleccionado ${customPayment.paymentReference.name}`} customClass="text-center font-mono text-lg" />

                            <Text text={`Realiza el pago a los siguientes datos`} customClass="text-center text-sm font-bold" />
                            <div className="grid place-content-center place-items-center">
                                {
                                    customPayment.paymentReference.data.map((item: string) => (
                                        <Text text={item} customClass="badge badge-neutral py-4" />
                                    ))
                                }
                            </div>

                            <div className="flex justify-center items-center gap-3">
                                <ButtonNotLink
                                    ico={<HandlerIco ico="x" />}
                                    click={close}
                                    variant="border"
                                    color="warning"
                                    text="Cancelar"
                                />
                                <ButtonNotLink
                                    click={HandleReportExecute}
                                    ico={<HandlerIco ico="config" />}
                                    color="primary"
                                    text="Reportar"
                                />
                            </div>
                        </div>
                        : <div className="grid gap-3">

                            <Subtitle text="Pagar" customClass="text-center font-black text-lg" />

                            <label className="text-sm">Método de pago a utilizar:</label>
                            <select onChange={(e) => setPayment(e.target.value)} className="select focus:outline-none">
                                <option value="">método de pago</option>
                                {
                                    myPayment.map(item => (
                                        <option value={item.id}>{item.paymentReference.name}</option>
                                    ))
                                }
                            </select>

                            <div className="flex justify-center items-center gap-3">
                                <ButtonNotLink
                                    ico={<HandlerIco ico="x" />}
                                    click={close}
                                    variant="border"
                                    color="warning"
                                    text="Cancelar"
                                />
                                <ButtonNotLink
                                    click={HandleCustomPayment}
                                    ico={<HandlerIco ico="config" />}
                                    color="primary"
                                    text="Continuar"
                                />
                            </div>
                        </div>
                    : <div>
                        <Subtitle text="No tienes métodos de pago" />
                    </div>
            }


        </div>
    )
}

export default PayModal;
