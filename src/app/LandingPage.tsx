import { FC } from "react";
import ExternalLink from "../components/ui/atoms/link/ExternalLink";
import { BsSendFill } from "react-icons/bs";
import Button from "../components/ui/atoms/Button";

const LandingPage: FC = ({}) => {

    return (
        <div>
            Landing
        
            <ExternalLink url="https://www.facebook.com" text="facebook" color="warning" />
        

            <Button color="info" ico={<BsSendFill />} text="alerta" click={() => {alert(123)}} />
        

            <Button color="info" ico={<BsSendFill />} text="ir al login" variant="bottom" url="/login" />

        </div>
    )
}

export default LandingPage;
