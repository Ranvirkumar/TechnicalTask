
import React from 'react'
import { Grid, Paper, Avatar, TextField, Checkbox, Button, Typography, Link, Box, Container, Toolbar, FormControlLabel } from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import firebase from './../../firebase'
import toast from '../../Component/toast'

const ResetPassword = () => {
    const history = useHistory()
    const paperStyle = { padding: 20, height: "auto", width: 300, margin: "0 auto" }
    const btnstyle = { margin: '8px 0' }
    const initialValues = {
        oldpassword: '',
        newpassword: '',
    }
    const Reauthenticate = (password) => {
        var user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, password)
        return user.reauthenticateWithCredential(cred)
    }
    const validationSchema = Yup.object().shape({
        oldpassword: Yup.string().min(4, "Password minimum length should be 4").required("Required"),
        newpassword: Yup.string().min(4, "Password minimum length should be 4").required("Required"),
    })
    const onSubmit = (values, props) => {
        const { oldpassword, newpassword } = values
        Reauthenticate(oldpassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newpassword).then(() => {
                toast.success("password has changed")
                props.resetForm()
                props.setSubmitting(false)
            }).catch((error) => {
                props.setSubmitting(false)
                toast.error(error.message)
            })
        }).catch((error) => {
            props.setSubmitting(false)
            toast.error(error.message)
        })
    }
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper style={paperStyle}>
                    <Grid align='center'>
                        <h2>Change Password</h2>
                    </Grid>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}>
                        {(props) => (
                            <Form>
                                <Grid mb={2}>
                                    <Field
                                        as={TextField}
                                        label='Old password'
                                        name="oldpassword"
                                        placeholder='Enter old password'
                                        type='password'
                                        fullWidth
                                        required
                                        helperText={<ErrorMessage name="oldpassword" />} />
                                </Grid>
                                <Grid mb={2}>
                                    <Field
                                        as={TextField}
                                        label='New Password'
                                        name="newpassword"
                                        placeholder='Enter new password'
                                        type='password'
                                        fullWidth
                                        required
                                        helperText={<ErrorMessage name="newpassword" />} />
                                </Grid>
                                <Button
                                    type='submit'
                                    color='primary'
                                    variant="contained"
                                    disabled={props.isSubmitting}
                                    style={btnstyle} fullWidth>
                                    {props.isSubmitting ? "Loading" : "Reset password"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </Box>
    )
}

export default ResetPassword
