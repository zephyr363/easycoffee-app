import { Provider } from "react-redux";
import { SessionProvider } from "./session";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/store";
const AppProviders: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <SessionProvider>{children}</SessionProvider>
            </Provider>
        </BrowserRouter>
    );
};

export default AppProviders;
