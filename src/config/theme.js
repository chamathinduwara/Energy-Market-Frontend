import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#c6c7e9',
            main: '#2b45f7',
            dark: '#043bbf',
            contrastText: '#000000',
        },
    }
});