import React, { useState } from 'react'

import { Form, Spinner } from 'react-bootstrap'
import MainCard from '../common/MainCard'

import style from '../styles/login.module.scss'
import { routes } from '../../routes'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/instance'

import logo from '../../images/logonft.png'
import CustomButton from '../common/Button'
import { useDispatch } from 'react-redux'
import { Login } from '../../redux/Actions'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons/faEyeSlash'



const LoginUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, isLoading] = useState(false)

    const [showPass, isShowPass] = useState(false)

    // useEffect(() => {
    //     if (data?.isInitializzed) {
    //         toast.success('Sucessfully Singup')
    //     }

    // }, [data?.isInitializzed])


    // const initailState = {
    //     email: '',
    //     password: '',
    // }
    // const [values, setValues] = useState(initailState)
    // const handleChange = (e) => {
    //     const { name, value } = e.target
    //     values[name] = value
    //     setValues({ ...values })

    // }
    // const submitForm = (e) => {
    //     e.preventDefault()

    //     const localData = {
    //         ...values
    //     }
    //     // if suucess
    //     dispatch(Login({ user: values?.email }))
    //     console.log(localData)
    // }

    return (
        <>

            <MainCard>

                <div className={style.login} >
                    <div className={'text-center mt-3 mb-4 '}>
                        <img src={logo} alt={'logo'} />
                    </div>
                    <div>
                        <h2>Hi,Welcome Back!</h2>
                        <p>Enter your credentials to continue </p>
                    </div>
                    <div>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                password: Yup.string().max(255).required('Password is required')
                            })}
                            onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                                isLoading(true)
                                try {
                                    axios.post('/login', {
                                        password: values.password,
                                        email: values.email
                                    })
                                        .then(function (response) {

                                            if (response.data.status === 200) {

                                                localStorage.setItem('userID', values?.email)
                                                localStorage.setItem('token', response.data.body.token)
                                                dispatch(Login({ user: values?.email, token: response.data.body.token, isLoginIn: true }))

                                                // dispatcher({      
                                                //     type: ACCOUNT_INITIALIZE,
                                                //     payload: { isLoggedIn: true, user: response.data.body.user, token: response.data.body.token }
                                                // });
                                                setStatus({ success: true });
                                                setSubmitting(false);
                                                isLoading(false)
                                                navigate('/');

                                            } else {
                                                setStatus({ success: false });
                                                setErrors({ submit: response.data.message });
                                                isLoading(false)
                                                toast.dark(response.data.message)
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
                                    toast.dark(err.message)
                                    isLoading(false)
                                    setSubmitting(false);

                                }
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid,
                            }) => (
                                <Form onSubmit={handleSubmit} >
                                    <Form.Group className='mb-4' controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email"

                                            value={values.email}
                                            name="email"

                                            onChange={handleChange}
                                            placeholder="Email Address / Username"

                                            isInvalid={errors.email && touched.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className='mb-4 position-relative' controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>


                                        <Form.Control type={`${showPass ? 'text' : 'password'}`}
                                            value={values.password}
                                            name="password"
                                            onChange={handleChange}
                                            isInvalid={errors.password && touched.password}
                                            placeholder='Password'


                                        />
                                        <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} className='eye' onClick={() => isShowPass(!showPass)} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password && touched.password ? <div>{errors.password}</div> : null}
                                        </Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mt-4 mb-3 d-flex align-items-center justify-content-between" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember me" />
                                        <Link to={routes.forgetpass} className={style.forgetpass} >Forget password ?</Link>
                                    </Form.Group>
                                    <CustomButton onClick={handleSubmit} customClass={style.explore} >
                                        {loading ? (
                                            <Spinner animation="border" role="status">
                                            </Spinner>
                                        ) : 'Sign In'}

                                    </CustomButton>



                                    <div className='text-center'>
                                        <Link to={routes.signup} className={style.signup} >Dont have an Account?</Link>
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

export default LoginUser