import React from "react";
import type { UserI } from "../types/user";

type SessionContextType = {
    user: UserI | null;
};
const SessionContext = React.createContext<SessionContextType>({
    user: null,
});

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = React.useState<UserI | null>(null);
    return (
        <SessionContext.Provider value={{ user }}>
            {children}
        </SessionContext.Provider>
    );
}
