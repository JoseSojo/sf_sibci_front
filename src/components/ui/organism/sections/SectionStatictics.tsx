import { FC, useEffect, useState } from "react";
import { StaticticsFound } from "../../../../types/statictics";
import { URL_API } from "../../../../env";
import { GetToken } from "../../../../service/auth/TokenStorage";
import SectionUniqueStatictics from "./SectionUniqueStatictics";

interface SectionStaticticsProps {
    path: string;
    reload: boolean;
    userId?: string;
}

const SectionStatictics: FC<SectionStaticticsProps> = ({ path,reload,userId }) => {

    const [found,setFound] = useState<StaticticsFound[] | null>(null);

    useEffect(() => {
        (async () => {
            const url = `${URL_API}/statictics/found/${path}/?userId=${userId}`;
            const result = await fetch(url, { headers:{token:`${GetToken()}`} });
            const json = await result.json();
            if(json.found) setFound(json.found);
        })()
    }, []);

    return (
        <>{
            found 
            && <section>
                {
                    found.map(item => <SectionUniqueStatictics reload={reload} path={item.path} />)
                }
            </section>
        }</>
    )
}

export default SectionStatictics; 
