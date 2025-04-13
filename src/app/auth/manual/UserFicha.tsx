import { FC } from "react";
import { useParams } from "react-router-dom";
import AbstractCrudFichaInit from "../abstract/AbstractCrudFichaInit";
import AbstractCrudInit from "../abstract/AbstractCrudInit";
import SemiCircleChart from "../../../components/ui/compounds/card/CardBarGraphic";
import SectionStatictics from "../../../components/ui/organism/sections/SectionStatictics";

interface UserFichaProps { }

const UserFicha: FC<UserFichaProps> = () => {

    const { id } = useParams() as { id: string };

    return (<>
        <div className="tabs tabs-lift">
            <input type="radio" name="my_tabs_3" className="tab" aria-label="Ficha" />
            <div className="tab-content bg-base-100 border-base-300 p-6"><AbstractCrudFichaInit id={id} object="user" /></div>

            <input type="radio" name="my_tabs_3" className="tab" aria-label="Wallet" defaultChecked />
            <div className="tab-content bg-base-100 border-base-300 p-6"><AbstractCrudFichaInit id={id} object="user/wallet" /></div>

            <input type="radio" name="my_tabs_3" className="tab" aria-label="Pagos" />
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <div className="flex flex-wrap gap-3 mt-3">
                    {/* <CardWallet reloadVl={reload} reloadFn={ReloadFn} /> */}
                    <div></div>
                    <div className="rounded bg-base-300 p-3 flex-1">
                        <AbstractCrudInit userId={id} query={`id=${id}`} count={3} object="user/payment" />
                    </div>

                    <div className="rounded bg-base-300 p-3 w-full">
                        <AbstractCrudInit userId={id} query={`id=${id}`} object="user/payment/register" />
                    </div>

                    <div className="mt-5 w-full grid grid-cols-2 gap-4">
                        <SemiCircleChart userId={id} query={`id=${id}`} path={`payment/user/?userId=${id}`} reload />
                        <SemiCircleChart userId={id} query={`id=${id}`} path={`payment/user/?userId=${id}`} reload />
                    </div>

                    <div className="rounded bg-base-300 p-3 w-full">
                        <SectionStatictics userId={id} reload path="register/payment" />
                    </div>
                </div>
            </div>

            <input type="radio" name="my_tabs_3" className="tab" aria-label="Subscripción" />
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <AbstractCrudFichaInit object="user/subscription/ficha" id={id} userId={id} />
            </div>
        </div>
    </>
    )
}

export default UserFicha;
