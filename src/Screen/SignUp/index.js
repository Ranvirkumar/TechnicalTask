import React from 'react'
import {
    Grid,
    Paper,
    Avatar,
    Typography,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    FormControl,
    Checkbox,
    FormHelperText,
    Link
} from "@mui/material";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import firebase from './../../firebase'
import toast from '../../Component/toast'

const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const initialValues = {
        name: '',
        email: '',
        gender: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: false
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        gender: Yup.string().oneOf(["male", "female"], "Required").required("Required"),
        phoneNumber: Yup.string()
            .required("This field is Required")
            .matches(
                /^[6-9][0-9]{9}$/,
                "Phone number is not valid"
            ),
        password: Yup.string().min(6, "Password minimum length should be 6").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
        termsAndConditions: Yup.string().oneOf(["true"], "Accept terms & conditions")
    })
    const onSubmit = (values, props) => {
        const { name, email, gender, phoneNumber, password } = values
        console.log("data=========>",values)
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const database = firebase.firestore().collection("RegistationData");
                database
                    .add({
                        name, email, gender, phoneNumber
                    })
                    .then((docRef) => {
                        toast.success("Added Succeffully")
                        props.resetForm()
                        props.setSubmitting(false)
                    })
                    .catch((error) => {
                        console.log("error========>",error)
                        toast.error(error.message)
                        props.setSubmitting(false)

                    });
            })
            .catch((error) => {
                console.log("error========>",error)
                toast.error(error.message)
                props.setSubmitting(false)
            });
    }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography
                        variant='caption'
                        gutterBottom>
                        Please fill this form to create an account !
                    </Typography>
                </Grid>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {(props) => (
                        <Form>
                            <Grid mb={2}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="name"
                                    label='Name'
                                    placeholder="Enter your name"
                                    helperText={<ErrorMessage name="name" />}
                                />
                            </Grid>
                            <Grid mb={2}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="email"
                                    label='Email'
                                    placeholder="Enter your email"
                                    helperText={<ErrorMessage name="email" />} />
                            </Grid>
                            <Grid mb={2}>
                                <FormControl component="fieldset" style={marginTop}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    < Field
                                        as={RadioGroup}
                                        aria-label="gender"
                                        name="gender"
                                        name="gender"
                                        style={{ display: 'initial' }}>
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio />}
                                            label="Female" />
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio />}
                                            label="Male" />
                                    </ Field>
                                </FormControl>
                                <FormHelperText>
                                    <ErrorMessage
                                        name="gender" />
                                </FormHelperText>
                            </Grid>
                            <Grid mb={2}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="phoneNumber"
                                    label='Phone Number'
                                    placeholder="Enter your phone number"
                                    helperText={<ErrorMessage name="phoneNumber" />} />
                            </Grid>
                            <Grid mb={2}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name='password'
                                    type="password"
                                    label='Password'
                                    placeholder="Enter your password"
                                    helperText={<ErrorMessage name="password" />} />
                            </Grid>
                            <Grid mb={2}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="confirmPassword"
                                    type="password"
                                    label='Confirm Password'
                                    placeholder="Confirm your password"
                                    helperText={<ErrorMessage name="confirmPassword" />} />
                            </Grid>
                            <Grid mb={2}>
                                <FormControlLabel
                                    control={<Field as={Checkbox}
                                        name="termsAndConditions" />}
                                    label="I accept the terms and conditions."
                                />
                                <FormHelperText>
                                    <ErrorMessage
                                        name="termsAndConditions" />
                                </FormHelperText>
                            </Grid>
                            <Button
                                type='submit'
                                variant='contained'
                                disabled={props.isSubmitting}
                                color='primary'>
                                {props.isSubmitting ? "Loading" : "Sign up"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Typography mb={1}>
                    <Link href="/" >
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signup;