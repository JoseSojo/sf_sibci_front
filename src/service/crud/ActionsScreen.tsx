import CreateForm from "../../app/auth/abstract/partials/CreateForm";
import { ObjectSupport } from "../../types/app";
import { ActionsCrud, ActionsRowCrud } from "../../types/crud";

export const HandlerActionsScreen = (action: ActionsCrud | ActionsRowCrud, init: any, object: ObjectSupport, reload: () => void, navigate: (path: string) => void,id?:string) => {
    
    if(action.use === `modal`) {
        if(action.ico == `create`) return init(<CreateForm parentId={id} id={id} reload={reload} action="create" object={object} use={action.use} />);
    } else {
        if(action.ico == `create`) return navigate(`create`)
    }
}