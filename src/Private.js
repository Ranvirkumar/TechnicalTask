import React, { useEffect, useState } from 'react'
import Dashboard from "./Screen/Dashboard"
import {
    Switch,
    Route,
    useLocation,
    useHistory
} from "react-router-dom";
import { StyledEngineProvider, CssBaseline, Box } from "@mui/material";
import ProtectedRoute from "./Utils/Protected"
import NavigationScroll from "./Component/NavigationScroll"
import Header from "./Component/Header"
import Sidebar from "./Component/Sidebar"
import toast from './Component/toast'
import ResetPassword from "./Screen/ResetPassword"
import ChangeEmail from "./Screen/ChangeEmail"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import firebase from './firebase';
const theme = createTheme();
const Private = () => {
    const [open, setOpen] = useState(true);
    const [toggleOpen, settoggleOpen] = useState(true);
    const [title, setTitle] = useState("Dashboard");
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const history = useHistory()
    const location = useLocation()
    const isAuthenticated = firebase.auth().currentUser?.email
    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            toast.success("Successfully logout")
            history.push("/")
        }).catch((error) => {
            toast.error(error.message)
        })
    }
    const handleUrl = (item) => {
        setTitle(item.title)
        history.push(item.url)
    }
    const isMobileDevice = window.navigator.userAgent.toLowerCase().includes("mobi");

    useEffect(() => {
        if (isMobileDevice) {
            settoggleOpen(false)
        } else {
            settoggleOpen(open)
        }
    }, [isMobileDevice, open])
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <NavigationScroll>
                        {isAuthenticated && <Header open={toggleOpen} toggleDrawer={toggleDrawer} handleLogout={handleLogout} title={title} />}
                        {isAuthenticated && <Sidebar open={toggleOpen} toggleDrawer={toggleDrawer} handleUrl={handleUrl} title={title} />}
                        <Switch location={location} key={location.pathname} >
                            {isAuthenticated && <ProtectedRoute exact path="/" component={Dashboard} />}
                            <ProtectedRoute path="/Dashboard" component={Dashboard} />
                            <ProtectedRoute path="/ResetPassword" component={ResetPassword} />
                            <ProtectedRoute path="/ChangeEmail" component={ChangeEmail} />
                        </Switch>
                    </NavigationScroll>
                </Box>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default Private;
