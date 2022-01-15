import React, { useEffect, useState } from 'react'
import { Grid, Paper, Avatar, TextField, Checkbox, Button, Typography, Link, Box, Container, Toolbar, FormControlLabel } from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import firebase from './../../firebase'
import toast from '../../Component/toast'

const ChangeEmail = () => {
    const paperStyle = { padding: 20, height: "auto", width: 300, margin: "0 auto" }
    // const [docId, setDocId] = useState("")
    const btnstyle = { margin: '8px 0' }
    const initialValues = {
        username: '',
        password: '',
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().email('please enter valid email').required("Required"),
        password: Yup.string().min(4, "Password minimum length should be 4").required("Required"),
    })
    const Reauthenticate = (password) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, password)
        return user.reauthenticateWithCredential(cred)
    }
    const handleUpdateEmail = (user, username, props) => {
        user.updateEmail(username).then(() => {
            toast.success("Email updated Succeffully")
            props.resetForm()
            props.setSubmitting(false)
        }).catch((error) => {
            props.setSubmitting(false)
            toast.error(error.message)
        })
    }
    const handleUpdateData = (user, username, props, docId) => {
        firebase.firestore().collection("RegistationData").doc(docId).update({ email: username }).then((res) => {
            toast.success("Data updated Succeffully")
            handleUpdateEmail(user, username, props)
        }).catch((error) => {
            props.setSubmitting(false)
            toast.error(error.message)
        })
    }
    const onSubmit = (values, props) => {
        const { username, password } = values
        Reauthenticate(password).then(() => {
            var user = firebase.auth().currentUser;
            getDocId(user, username, props)
        })
            .catch((error) => {
                props.setSubmitting(false)
                toast.error(error.message)
            })
    }
    const getDocId = (user, username, props) => {
        firebase.firestore().collection("RegistationData").where("email", "==", user.email).get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                handleUpdateData(user, username, props, doc.id)
            })
        }).catch((error) => {
            props.setSubmitting(false)
            toast.error(error.message)
        });
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
                        <h2>Change Email</h2>
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
                                        label='Username'
                                        name="username"
                                        placeholder='Enter New username'
                                        fullWidth
                                        required
                                        helperText={<ErrorMessage name="username" />}
                                    />
                                </Grid>
                                <Grid mb={2}>
                                    <Field
                                        as={TextField}
                                        label='Password'
                                        name="password"
                                        placeholder='Enter password'
                                        type='password'
                                        fullWidth
                                        required
                                        helperText={<ErrorMessage name="password" />} />
                                </Grid>
                                <Button
                                    type='submit'
                                    color='primary'
                                    variant="contained"
                                    disabled={props.isSubmitting}
                                    style={btnstyle} fullWidth>
                                    {props.isSubmitting ? "Loading" : "Change Email"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </Box>
    )
}

export default ChangeEmail
