import { FC, useEffect, useState } from "react";
import CountCard from "../../compounds/card/CountCard";
import { GenerateCard } from "../../../../service/crud/dashboard/HandlerDashboard";
import { IconsType } from "../../../../types/app";

interface SectionCardsProps {
    path: string
}

const SectionCards: FC<SectionCardsProps> = ({ path }) => {

    const [card, setCard] = useState<{ title: string, count: number | string, ico:IconsType }[] | null>();
    const [load, setLoad] = useState(true);

    useEffect(() => {
        (async () => {
            const result = await GenerateCard({ path });
            if (result) {
                setCard(result);
                setLoad(false);
            }
        })()
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {
                load
                    ? <div className="w-full flex justify-center items-center py-2"><span className="loading loading-spinner m-auto"></span></div>
                    : card && card.map(item => (
                        <CountCard ico={item.ico} title={item.title} count={item.count} />
                    ))
            }
        </div>
    )
}

export default SectionCards;
