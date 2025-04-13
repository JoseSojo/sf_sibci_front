import { FC, useEffect, useState } from "react";
import DashboardPage from "./DashboardPage";
import { URL_API } from "../../env";
import { GetToken } from "../../service/auth/TokenStorage";

interface ChangeDashbaordProps {}

const ChangeDashbaord: FC<ChangeDashbaordProps> = () => {

    const [dashboard, setDashboard] = useState(``);

    useEffect(() => {
        (async () => {
            const url = `${URL_API}/dashboard/gui/current`;
            const result = await fetch(url, { headers:{ token:`${GetToken()}` } });
            const json = await result.json();
            setDashboard(json.name);
        })()
    }, [])

    return <DashboardPage
        patient={ dashboard === `PHARMACY` || dashboard === `ROOT` || dashboard === `CLINIC` ? false : true }
        subscription={ dashboard === `PHARMACY` || dashboard === `ROOT` || dashboard === `PATIENT` ? false : true }
    />
}

export default ChangeDashbaord;
