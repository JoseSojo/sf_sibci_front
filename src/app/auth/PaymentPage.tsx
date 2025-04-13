import { FC, useState } from "react";
import Subtitle from "../../components/ui/atoms/text/Subtitle";
import AbstractCrudInit from "./abstract/AbstractCrudInit";
import CardWallet from "../../components/ui/compounds/card/CardWallet";
import SemiCircleChart from "../../components/ui/compounds/card/CardBarGraphic";

const PaymentPage: FC = ({ }) => {

    const [reload, setReload] = useState(true);

    const ReloadFn = () => setReload(!reload);

    return (
        <div>
            <Subtitle text="Pagos" size="3xl" customClass="font-black" />

            <div className="flex flex-wrap gap-3 mt-3">
                <CardWallet reloadVl={reload} reloadFn={ReloadFn} />
                <div className="rounded bg-base-300 p-3 flex-1">
                    <AbstractCrudInit count={3} object="user/payment" />
                </div>

                <div className="rounded bg-base-300 p-3 w-full">
                    <AbstractCrudInit reloadVl={reload} object="user/payment/register" />
                </div>

                <div className="mt-5 w-full grid grid-cols-2 gap-4">
                    <SemiCircleChart path="payment/user" reload={reload} />
                    <SemiCircleChart path="payment/user/status" reload={reload} />
                </div>

                {/* <div className="rounded bg-base-300 p-3 w-full">
                    <SectionStatictics reload={reload} path="register/payment" />
                </div> */}
            </div>

        </div>
    )
}

export default PaymentPage;
