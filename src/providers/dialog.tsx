import { createContext } from "react";
import LoginDialog from "../widgets/login-dialog";

const DialogContext = createContext({

})

export const DialogProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <DialogContext.Provider value={{}}>
            {children}
            <LoginDialog />
        </DialogContext.Provider>
    )
}

