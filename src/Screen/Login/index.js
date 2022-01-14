
import React from 'react'
import { Grid, Paper, Avatar, TextField, Checkbox, Button, Typography, Link, FormControlLabel } from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import firebase from './../../firebase'
import toast from '../../Component/toast'

const Login = () => {
    const history = useHistory()
    const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
    const btnstyle = { margin: '8px 0' }
    const initialValues = {
        username: '',
        password: '',
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().email('please enter valid email').required("Required"),
        password: Yup.string().required("Required")
    })
    const onSubmit = (values, props) => {
        const { username, password } = values
        firebase.auth().signInWithEmailAndPassword(username, password)
            .then((res) => {
                toast.success("Successfully login")
                props.setSubmitting(false)
                window.localStorage.setItem("sessionToken",res.user.uid)
                props.resetForm()
                history.push("Dashboard")
            })
            .catch(error => {
                props.setSubmitting(false)
                toast.error(error.message)
            })
    }
    return (
        <Grid container>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <h2>Sign In</h2>
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
                                placeholder='Enter username'
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
                                {props.isSubmitting ? "Loading" : "Sign in"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Typography >
                    <Link href="/ForgetPassword" >
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link href="/Signup" >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login
