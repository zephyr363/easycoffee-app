import { Provider } from "react-redux";
import { SessionProvider } from "./session";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/store";
import { ThemeProvider } from "./theme";
import LoginDialog from "../widgets/login-dialog";
import { DialogProvider } from "./dialog";
const AppProviders: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider>
                    <SessionProvider>
                        <DialogProvider>
                            {children}
                        </DialogProvider>
                    </SessionProvider>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
};

export default AppProviders;
