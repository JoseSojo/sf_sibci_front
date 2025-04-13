import { FC } from "react";
import HandlerIco from "../../../../service/ui/HandlerIco";
import { IconsType } from "../../../../types/app";

interface CountCardProps {
    title:  string;
    count:  string | number;
    ico: IconsType
}

const CountCard: FC<CountCardProps> = ({ count, title, ico }) => {

    return (
        <div className="card bg-gradient-to-b from-base-100 to-base-300 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-base-content/60">{title}</p>
                    <h3 className="text-2xl font-bold text-base-content">{count}</h3>
                    {/* <span className="text-sm text-success">{count} vs mes anterior</span> */}
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    {<HandlerIco ico={ico} />}
                  </div>
                </div>
              </div>
            </div>
    )
}

export default CountCard;
