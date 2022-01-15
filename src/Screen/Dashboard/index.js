
import React, { useEffect, useState } from 'react';
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
    FormHelperText,
    Box,
    Toolbar,
    Container
} from "@mui/material";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import firebase from './../../firebase'
import toast from '../../Component/toast'
import Loader from "./../../Component/Loader"
function Dashboard() {
    const initialValues = {
        name: '',
        email: '',
        gender: '',
        phoneNumber: '',
    }
    const [data, setData] = useState(initialValues)
    const [Id, setId] = useState("")
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
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
    })
    useEffect(() => {
        getDocId()
    }, [])
    const getDocId = () => {
        const user = firebase.auth().currentUser
        firebase.firestore().collection("RegistationData").where("email", "==", user.email).get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                const value = doc.data()
                setData(value)
                setId(doc.id)
            })
        }).catch((error) => {
            toast.error(error.message)
        });
    }
    const handleUpdateData = (value, props) => {
        firebase.firestore().collection("RegistationData").doc(Id).update(value).then((res) => {
            toast.success("Data updated Succeffully")
            props.setSubmitting(false)
        }).catch((error) => {
            props.setSubmitting(false)
            toast.error(error.message)
        })
    }
    const onSubmit = (values, props) => {
        handleUpdateData(values, props)
    }
    if (data === initialValues) return <Loader />
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
                        <Avatar style={avatarStyle}>
                            <AddCircleOutlinedIcon />
                        </Avatar>
                        <Typography
                            variant='caption'
                            gutterBottom>
                            Please Update this form !
                        </Typography>
                    </Grid>
                    <Formik
                        initialValues={data}
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
                                        helperText={<ErrorMessage name="email" />}
                                        disabled={true} />
                                </Grid>
                                <Grid mb={2}>
                                    <FormControl component="fieldset" style={marginTop}>
                                        <FormLabel component="legend">Gender</FormLabel>
                                        < Field
                                            as={RadioGroup}
                                            aria-label="gender"
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

                                <Button
                                    type='submit'
                                    variant='contained'
                                    disabled={props.isSubmitting}
                                    color='primary'>
                                    {props.isSubmitting ? "Loading" : "Update Data"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </Box>
    );
}

export default Dashboard

