import React from 'react'
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
    const [open, setOpen] = React.useState(true);
    const [title, setTitle] = React.useState("Dashboard");
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
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <NavigationScroll>
                        {isAuthenticated && <Header open={open} toggleDrawer={toggleDrawer} handleLogout={handleLogout} title={title} />}
                        {isAuthenticated && <Sidebar open={open} toggleDrawer={toggleDrawer} handleUrl={handleUrl} title={title} />}
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
