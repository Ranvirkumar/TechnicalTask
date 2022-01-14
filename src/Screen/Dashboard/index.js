
import React, { useState } from 'react'
import { Grid, Typography, Button, Box } from "@mui/material"
import BasicModel from '../../Component/model'
const Dashboard = () => {
    const btnstyle = { margin: '8px 0' }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid container>
            <Typography>Dashboard</Typography>
            <Box>
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    onClick={handleOpen}>
                    Open modal
                </Button>
            </Box>
            <BasicModel
                open={open}
                handleClose={handleClose}
            />
        </Grid>
    )
}

export default Dashboard
