import {createContext, useContext} from "react"
import { createTheme,ThemeProvider as MUIThemeProvider, type PaletteMode } from "@mui/material/styles"
import CssBaseline from '@mui/material/CssBaseline';
import React from "react"
import { brown } from "@mui/material/colors";

type ThemeContextType = {
    mode: PaletteMode, 
    setMode: React.Dispatch<React.SetStateAction<PaletteMode>>
}


const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    setMode: () => {}
})

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [mode, setMode] = React.useState<PaletteMode>("light")
    const theme = createTheme({
        palette:{
            mode: mode,
            primary: {
                main: brown[700]
            }
        }
        
    })

    return (
        <ThemeContext.Provider value={{mode, setMode}}>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
}

