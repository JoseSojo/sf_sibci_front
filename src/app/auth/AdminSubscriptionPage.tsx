import { FC } from "react";
import AbstractCrudInit from "./abstract/AbstractCrudInit";
import SectionCards from "../../components/ui/organism/dashboard/SectionCards";

interface AdminSubscriptionPageProps { }

const AdminSubscriptionPage: FC<AdminSubscriptionPageProps> = ({ }) => {

    return (
        <div>
            <SectionCards path="/subscription/gui/dashboard" />

            <div className="w-full rounded-[20px] bg-base-200 p-4 mt-4 ">
                <AbstractCrudInit object="user/subscription" />
            </div>

            <div className="w-full rounded-[20px] bg-base-200 p-4 mt-4 ">
                <AbstractCrudInit object="subscription" />
            </div>
        </div>
    )
}

export default AdminSubscriptionPage;
