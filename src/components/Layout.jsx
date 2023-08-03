import * as React from "react";
import {styled} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import NavDrawer from "./NavDrawer.jsx";
import {ROUTES} from "../config/routes.js";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Layout({children}) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: "24px", // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: "36px",
                            ...(open && {display: "none"}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        <Link to={ROUTES.ROOT} style={{color: 'white', textDecoration: 'none'}}>
                            Corda App
                        </Link>
                    </Typography>


                    <Link to={ROUTES.CREATE_PROPOSAL} style={{textDecoration: 'none', color: 'white'}}>
                        <Button variant="contained" color="secondary" sx={{ color: 'white', marginLeft: '20px' }}>
                            Create Proposal
                        </Button>
                    </Link>

                    <Link to={ROUTES.MODIFY_PROPOSAL}>
                        <Button variant="contained" color="secondary" sx={{ color: 'white', marginLeft: '20px' }}>Modify Proposal</Button>
                    </Link>
                    <Link to={ROUTES.ACCEPT_PROPOSAL}>
                        <Button variant="contained" color="secondary" sx={{ color: 'white', marginLeft: '20px' }}>Accept Proposal</Button>
                    </Link>

                </Toolbar>
            </AppBar>
            <NavDrawer toggle={toggleDrawer} isOpened={open}/>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Toolbar/>
                <Container
                    maxWidth="lg"
                    sx={{
                        mt: "10vh",
                        mb: 4,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {children}
                </Container>
            </Box>
        </Box>
    );
}
