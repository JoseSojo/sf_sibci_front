import { FC, useEffect, useState } from "react";
import Subtitle from "../../atoms/text/Subtitle";
import { URL_API } from "../../../../env";
import { GetToken } from "../../../../service/auth/TokenStorage";
import Text from "../../atoms/text/Text";

interface CardMySubProps {
    reload: boolean
}

const CardMySub: FC<CardMySubProps> = ({ reload }) => {
    const [mySub, setMySub] = useState<any | null>(null);

    useEffect(() => {
        (async () => {
            const url = `${URL_API}/user/subscription/found`;
            const result = await fetch(url, { headers: { token: `${GetToken()}` } });
            const json = await result.json();
            setMySub(json);
        })()
    }, [reload]);

    return (
        <div className="flex justify-between items-center gap-3">
            <Subtitle text="Subcripción" size="3xl" customClass="font-black" />

            {
                mySub && mySub.subscriptionReference && <div className="flex-[.6] mt-3 rounded bg-info bg-opacity-40 py-2 px-6 flex justify-between items-center">
                    <div className="grid">
                        <Text text="Mí subscripción" customClass="font-bold text-white" />
                        <Text text={`Actual: ${mySub.subscriptionReference.name}`} customClass="badge font-black text-sm text-white" />
                        {
                            mySub.nextsubscriptionReference &&
                            <Text text={`Renovación: ${mySub.nextsubscriptionReference.name}`} customClass="font-mono badge badge-neutral font-light text-xs mt-1 text-white" />
                        }
                    </div>
                    <div className="">
                        <Text text={`${mySub.startDate} / ${mySub.endDate}`} customClass="badge font-black text-sm text-white" />
                    </div>
                </div>
            }
        </div>
    )
}

export default CardMySub;
