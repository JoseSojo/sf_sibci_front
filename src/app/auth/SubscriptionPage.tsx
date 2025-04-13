import { FC, useEffect, useState } from "react";
import SectionCardPrincing from "../../components/ui/organism/sections/SectionCardPrincing";
import { URL_API } from "../../env";
import { GetToken } from "../../service/auth/TokenStorage";
import CardMySub from "../../components/ui/compounds/card/CardMySub";

const SubscriptionPage: FC = ({ }) => {

    const [reload, setReload] = useState(true);
    const [subscription, setSubscription] = useState<any[] | null>(null);

    useEffect(() => {
        (async () => {
            const url = `${URL_API}/subscription/?skip=0&take=3`;
            const result = await fetch(url, { headers: { token: `${GetToken()}` } });
            const json = await result.json() as { list: { id: string, month: string, price: string, name: string, items: { description: string }[] }[] };

            const setStatus: any[] = [];

            json.list.map(item => {
                setStatus.push({
                    ...item,
                    items: item.items.map(child => child.description)
                });
            });

            setSubscription(setStatus);
        })()
    }, [])

    return (
        <div>

            <CardMySub reload={reload} />

            {subscription && <SectionCardPrincing reload={() => setReload(!reload)} list={subscription} />}

        </div>
    )
}

export default SubscriptionPage;
