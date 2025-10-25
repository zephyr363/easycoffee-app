import React from "react";
import type { UserI } from "../types/user";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";

type SessionContextType = {
    user: UserI | null;
};
const SessionContext = React.createContext<SessionContextType>({
    user: null,
});

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const user = useAppSelector((state) => state.user.user);
    const isAuthenticated = Boolean(user);
    const navigate = useNavigate();

    // React.useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate('/Login');
    //     }
    // }, []);

    return (
        <SessionContext.Provider value={{ user }}>
            {children}
        </SessionContext.Provider>
    );
}
