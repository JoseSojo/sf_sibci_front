import { FC, useEffect, useState } from "react";
import { URL_API } from "../../../../env";
import { GetToken } from "../../../../service/auth/TokenStorage";
import { useNotification } from "../../../../context/NotificationContext";
import Subtitle from "../../atoms/text/Subtitle";
import Button from "../../atoms/Button";
import { IoIosArrowDropright, IoIosArrowDroprightCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";
import { useModal } from "../../../../context/ModalContext";
import ReportPay from "../modal/ReportPay";
import PayModal from "../modal/PayModal";

interface CardWalletProps {
    reloadFn: () => void;
    reloadVl: boolean;
}

const CardWallet: FC<CardWalletProps> = ({ reloadFn,reloadVl }) => {

    const { init } = useModal();
    const notification = useNotification();
    const [reload, setReload] = useState(true);    
    const [hidden, setHidden] = useState(true);
    const [wallet, setWallet] = useState<any | null>(null);

    useEffect(() => {
        (async () => {
            const url = `${URL_API}/user/wallet`;
            const result = await fetch(url, { headers: { token: `${GetToken()}` } });
            const json = await result.json() as any;
            setWallet(json.body ? json.body : null);
        })();


    }, [reload, reloadVl])

    const CreateWallet = () => {
        (async () => {
            const url = `${URL_API}/user/wallet/create`;
            const result = await fetch(url, { method: `POST`, headers: { token: `${GetToken()}` } });
            const json = await result.json() as any;
            setWallet(json.body ? json.body : null);
            notification.init(json.message, `success`);
            setReload(!reload);
        })();
    }

    const ReportPayExecute = () => {
        return init(<ReportPay reloadFn={reloadFn} />)
    }

    const PayModalExecute = () => {
        return init(<PayModal />)
    }

    return (
        <div className="rounded bg-base-300 p-3 flex-[.6]">
            {
                wallet
                    ? <>
                        <Subtitle text="Saldo Disponible" size="md" customClass="font-light" />
                        <Subtitle text={hidden ? `***` : `${wallet.mount}`} size="3xl" customClass="font-black duration-200" />
                        <div className="flex justify-start items-center gap-3 mt-3">
                            <Button
                                click={PayModalExecute}
                                ico={<IoIosArrowDropright />}
                                text="Pagar"
                                variant="border"
                                color="primary"
                            />
                            <Button
                                click={ReportPayExecute}
                                ico={<IoIosArrowDroprightCircle />}
                                variant="border"
                                color="primary"
                                text="Reportar"
                            />
                            <Button
                                ico={hidden ? <FaEye /> : <FaEyeLowVision />}
                                click={() => setHidden(!hidden)}
                                variant="border"
                                color="primary"
                                text="ocultar"
                            />
                        </div>
                    </>
                    : <>
                        <div className="grid place-items-center gap-3 mt-3">
                            <Subtitle text="No tienes billetera" size="md" customClass="font-light" />

                            <Button
                                click={CreateWallet}
                                ico={<IoIosArrowDroprightCircle />}
                                color="success"
                                text="Crear"
                            />
                        </div>
                    </>

            }
        </div>
    )
}

export default CardWallet;
