import { FC } from "react";
import SectionCards from "../../components/ui/organism/dashboard/SectionCards";
import CardMySub from "../../components/ui/compounds/card/CardMySub";
import AbstractCrudInit from "./abstract/AbstractCrudInit";

interface DashboardPageProps {
    patient?: boolean;
    subscription?: boolean;
}

const DashboardPage: FC<DashboardPageProps> = ({ patient = true, subscription = true }) => {

    return (
        <div className="w-full space-y-2">
            {
                subscription &&
                <CardMySub reload />
            }
            <SectionCards path="/dashboard/gui/card" />

            {/* PACIENTES START */}
            {
                patient &&
                <div className="pt-5">
                    <AbstractCrudInit object="nutricionist/patient" />
                </div>
            }
            {/* PACIENTES END */}

            {/* <TableContructor body={activeUser.body.label} extract={activeUser.body.extract} header={activeUser.header.label} /> */}

            {/* <TableContructor body={newUser.body.label} extract={newUser.body.extract} header={newUser.header.label} /> */}

            {/* <SectionGraphic /> */}

            {/* <Calendar /> */}

        </div>
    )
}

export default DashboardPage;
