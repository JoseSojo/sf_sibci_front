import { FC } from "react";
import Subtitle from "../../components/ui/atoms/text/Subtitle";
import CardGraphic from "../../components/ui/compounds/card/CardGraphic";

const StaticthicsPage: FC = ({ }) => {

    const payments = [
        { time: `2024-11-10`,value:25 },
        { time: `2024-12-10`,value:25 },
        { time: `2025-01-10`,value:25 },
        { time: `2025-02-10`,value:25 },
    ]

    const quoteStart = [
        { time: `2024-11-10`,value:1 },
        { time: `2024-11-16`,value:1 },
        { time: `2024-11-25`,value:1 },
        { time: `2024-12-10`,value:2 },
        { time: `2024-12-11`,value:3 },
        { time: `2025-01-17`,value:1 },
        { time: `2025-02-18`,value:3 }
    ]

    return (
        <div className="px-5">
            <Subtitle text="Sección de Análisis" size="3xl" customClass="font-black" />
            <div className="mt-5 grid gap-5">

                <CardGraphic title="Historial de pagos" data={payments} />
                <CardGraphic title="Historial de nuevas citas" data={quoteStart} />

            </div>

        </div>
    )
}

export default StaticthicsPage;
