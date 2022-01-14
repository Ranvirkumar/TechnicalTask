
import React from 'react'
import { Grid, Paper, Avatar, TextField, Checkbox, Button, Typography, Link, FormControlLabel } from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import firebase from './../../firebase'
import toast from '../../Component/toast'

const ForgetPassword = () => {
    const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
    const btnstyle = { margin: '8px 0' }
    const initialValues = {
        username: '',
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().email('please enter valid email').required("Required"),
    })
    const onSubmit = (values, props) => {
        const { username } = values
        setTimeout(() => {
            firebase.auth().sendPasswordResetEmail(username)
                .then((res) => {
                    props.resetForm()
                    props.setSubmitting(false)
                    toast.success("Email has been sent to you, please check and verify it.")
                })
                .catch(error => {
                    props.setSubmitting(false)
                    toast.error(error.message)
                })

        }, 2000)

    }
    return (
        <Grid>
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
                            <Button
                                type='submit'
                                color='primary'
                                variant="contained"
                                disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>
                                {props.isSubmitting ? "Loading" : "Send mail"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Typography>
                    <Link href="/" >
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default ForgetPassword
