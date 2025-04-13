import { FC } from "react";
import AbstractCrudInit from "./abstract/AbstractCrudInit";
import SemiCircleChart from "../../components/ui/compounds/card/CardBarGraphic";
import SectionStatictics from "../../components/ui/organism/sections/SectionStatictics";

interface FinanzasPageProps { }

const FinanzasPage: FC<FinanzasPageProps> = ({ }) => {

    return (
        <div>
            <div className="mb-5 w-full grid grid-cols-2 gap-4">
                <SemiCircleChart path="payment/all" reload />
                <SemiCircleChart path="payment/all/status" reload />
            </div>

            <AbstractCrudInit object="finanzas" />

            <div className="mt-4">
                <SectionStatictics reload path="finanzas" />
            </div>

        </div>
    )
}

export default FinanzasPage;
