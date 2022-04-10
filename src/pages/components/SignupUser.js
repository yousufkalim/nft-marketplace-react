import React, { useState } from 'react'
import { Form, Row, Col, Spinner } from 'react-bootstrap'

import axios from '../../api/instance'
import CustomButton from '../common/Button'
import MainCard from '../common/MainCard'
import { Link, useNavigate } from 'react-router-dom'

import logo from '../../images/logonft.png'
import style from '../styles/login.module.scss'
import { routes } from '../../routes'

import { useDispatch } from 'react-redux'
import { Signup } from '../../redux/Actions'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify';



const SignupUser = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, isLoading] = useState(false)
    return (
        <>

            <MainCard>
                <div className={style.login} >
                    <div className={'text-center mt-3 mb-4 '}>
                        <img src={logo} alt={'logo'} />
                    </div>
                    <div>
                        <h2>Sign Up</h2>
                        <p>Enter your credentials to continue </p>
                    </div>
                    <div>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                first_name: '',
                                last_name: '',
                                acceptTerms: false,
                                confirm_password: ''


                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                password: Yup.string().max(255).required('Password is required'),
                                first_name: Yup.string().required('feild is required'),
                                last_name: Yup.string().required('feild is required'),
                                acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
                                confirm_password: Yup.string().required("Confirm Password is required").when("password", {
                                    is: val => (val && val.length > 0 ? true : false),
                                    then: Yup.string().oneOf(
                                        [Yup.ref("password")],
                                        "Both password need to be the same"
                                    )
                                })
                            })}
                            onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                                isLoading(true)
                                try {
                                    axios.post('/signup', {
                                        password: values.password,
                                        email: values.email,
                                        first_name: values.first_name,
                                        last_name: values.last_name,
                                        wallet_id: '0x8ebe1407ccd2b48f12e746AeC2352Af282a25b0e',
                                        confirm_password: values.confirm_password,

                                    })
                                        .then(function (response) {

                                            if (response.data.status === 200) {

                                                dispatch(Signup({ name: values.first_name + values.last_name, user: values?.email, token: response.data.body.token, isLoggedIn: true, }))
                                                // dispatcher({
                                                //     type: ACCOUNT_INITIALIZE,
                                                //     payload: { isLoggedIn: true, user: response.data.body.user, token: response.data.body.token }
                                                // });



                                                setStatus({ success: true });
                                                setSubmitting(false);
                                                isLoading(false)
                                                navigate(routes.login);

                                            } else {
                                                setStatus({ success: false });
                                                setErrors({ submit: response.data.message });
                                                toast.dark(response.data.message)
                                                isLoading(false)
                                                setSubmitting(false);
                                            }
                                        })
                                        .catch(function (error) {


                                            setStatus({ success: false });
                                            setErrors({ submit: error.response.data.message });
                                            toast.dark(error.response.data.message)
                                            isLoading(false)
                                            setSubmitting(false);
                                        });
                                } catch (err) {
                                    console.error(err);

                                    setStatus({ success: false });
                                    setErrors({ submit: err.message });
                                    isLoading(false)
                                    toast.dark(err.message)
                                    setSubmitting(false);

                                }
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid,
                            }) => (

                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className={`${!!errors.email ? 'mb-0' : 'mb-2'}`} controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email"
                                            value={values.email}
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Email Address / Username"
                                            isValid={touched.email && !errors.email}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Row className={`'align-items-center' ${!!errors.last_name || !!errors.first_name ? 'mb-0' : 'mb-2'}`}>
                                        <Col xs={6} md={6}>
                                            <Form.Group controlId="fName">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="email"
                                                    value={values.first_name}
                                                    name="first_name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="First name"
                                                    isValid={touched.first_name && !errors.first_name}
                                                    isInvalid={!!errors.first_name}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.first_name}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6} md={6}>
                                            <Form.Group controlId="Namel">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="last_name"
                                                    value={values.last_name}
                                                    name="last_name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Last name"
                                                    isValid={touched.last_name && !errors.last_name}
                                                    isInvalid={!!errors.last_name}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.last_name}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>


                                    <Row className={`'align-items-center' ${!!errors.password || !!errors.confirm_password ? 'mb-0' : 'mb-2'}`}>
                                        <Col xs={6} md={6}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type={'password'}
                                                    value={values.password}
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    isValid={touched.password && !errors.password}
                                                    isInvalid={!!errors.password}
                                                    placeholder="Password"

                                                />

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6} md={6}>
                                            <Form.Group controlId="confirm_password">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type={'password'}
                                                    value={values.confirm_password}
                                                    name="confirm_password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    isValid={touched.confirm_password && !errors.confirm_password}
                                                    isInvalid={!!errors.confirm_password}
                                                    placeholder="Confirm Password"

                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.confirm_password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-2 d-flex align-items-center justify-content-between" controlId="formBasicCheckbox">

                                        <div className="form-group form-check">
                                            <Field type="checkbox" name="acceptTerms" id="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                                            <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>

                                        </div>
                                    </Form.Group>
                                    <CustomButton customClass={style.explore} onClick={handleSubmit} >
                                        {isSubmitting ? (<Spinner animation="border" role="status">
                                        </Spinner>) : 'Sign Up'}
                                    </CustomButton>
                                    <div className='text-center'>
                                        <Link to={routes.login} className={style.signup} >Already have an account?</Link>
                                    </div>
                                </Form>

                            )}


                        </Formik>

                    </div>
                </div>
            </MainCard>
        </>
    )

}

export default SignupUser