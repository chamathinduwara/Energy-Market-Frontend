import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft.js";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {Link} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import {styled} from "@mui/material/styles";
import * as React from "react";
import {ROUTES} from "../config/routes.js";

import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

function LinkItem({path, text, icon}) {
    return (
        <Link to={path} style={{textDecoration: 'none', color: 'black'}}>
            <ListItemButton>
                {icon &&
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                }
                <ListItemText primary={text}/>
            </ListItemButton>
        </Link>
    )
}

export default function NavDrawer({isOpened, toggle}) {

    return (
        <Drawer variant="permanent" open={isOpened}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    px: [1],
                }}
            >
                <IconButton onClick={toggle}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List component="nav">

                <LinkItem path={ROUTES.ME} text="ME" icon={<PersonAddIcon/>}/>
                <LinkItem path={ROUTES.PEERS} text="PEERS" icon={<GroupIcon/>}/>
                <LinkItem path={ROUTES.PROPOSAL} text="PROPOSALS" icon={<ImportContactsIcon/>}/>
                <LinkItem path={ROUTES.MODIFIERS} text="MODIFIERS" icon={<ImportContactsIcon/>}/>
                <LinkItem path={ROUTES.TRADES} text="TRADES" icon={<ImportContactsIcon/>}/>

                <Divider sx={{my: 1}}/>
            </List>
        </Drawer>
    )
}