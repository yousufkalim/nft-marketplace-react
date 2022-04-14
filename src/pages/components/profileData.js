import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Spinner } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../common/Button';

import axios from '../../api/instance'

import { routes } from '../../routes'

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getInfo } from '../../redux/Actions';


const ProfileData = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const state = useSelector(state => state?.authReducer)

    const [loading, isLoading] = useState(false)

    return (
        <div className='white-bg'>
            <h2>General Profile</h2>
            <Formik
                initialValues={{
                    first_name: state?.first_name,
                    last_name: state?.last_name,
                    email: state?.email,
                    username: state?.username,
                    address: state?.address1,
                    address2: state?.address2,
                    city: state?.city,
                    statee: state?.state,
                    provence: state?.provence,
                    country: state?.country,
                    postal_code: state?.postal_code,
                    phone1: state?.phone1,
                    phone2: state?.phone2,
                    // answer1: "state?.answer1,",
                    answer2: " state?.answer2,",
                    answer3: "state?.answer3",
                    answer4: " state?.answer4",
                    irs1099: " state?.irs1099",
                    image_profile_location: "state?.image_profile_location",
                    company: state?.company,
                    show_explicit: state?.show_explicit,

                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    first_name: Yup.string().required('feild is required'),
                    last_name: Yup.string().required('feild is required'),
                    username: Yup.string().required('feild is required'),
                    //  address: Yup.string().required('feild is required'),
                    address2: Yup.string().required('feild is required'),
                    city: Yup.string().required('feild is required'),
                    statee: Yup.string().required('feild is required'),
                    provence: Yup.string().required('feild is required'),
                    company: Yup.string().required('feild is required'),
                    country: Yup.string().required('feild is required'),
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    isLoading(true)

                    try {
                        axios.post('/update_user/', {
                            first_name: values?.first_name,
                            last_name: values?.last_name,
                            email: values?.email,
                            username: values?.username,
                            address1: values?.address,
                            address2: values?.address2,
                            city: values?.city,
                            state: values?.statee,
                            provence: values?.provence,
                            country: values?.country,
                            postal_code: values?.postal_code,
                            phone1: values?.phone1,
                            phone2: values?.phone2,
                            answer1: "values?.answer1",
                            answer2: "values?.answer2",
                            answer3: "values?.answer3",
                            answer4: "values?.answer4",
                            irs1099: "values?.irs1099",
                            image_profile_location: "values?.image_profile_location",
                            company: values?.company,
                            show_explicit: values?.show_explicit,

                        })
                            .then(function (response) {
                                if (response.data.status === 200) {

                                    setStatus({ success: true });
                                    setSubmitting(false);
                                    isLoading(false)
                                    toast.dark('Sucessfully Updated')
                                    dispatch(dispatch(getInfo()))

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
                                setErrors({ submit: error.response?.data?.message });
                                toast.dark(error.response?.data?.message)
                                isLoading(false)
                                setSubmitting(false);
                            });
                    } catch (err) {


                        setStatus({ success: false });
                        setErrors({ submit: err?.message });
                        isLoading(false)
                        toast.dark(err?.message)
                        setSubmitting(false);

                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>User name</Form.Label>
                                    <Form.Control type="text" placeholder="Username"
                                        value={values.username || " "}
                                        name="username"
                                        isInvalid={errors.username && touched.username}
                                        onChange={handleChange}

                                    />
                                    {errors.username && touched.username && <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="Email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email " placeholder="Email" disabled value={values?.email || " "}
                                        name="email"
                                        isInvalid={errors.email && touched.email}
                                        onChange={handleChange}

                                    />
                                    {errors.email && touched.email && <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" placeholder="First name" value={values?.first_name}


                                        name="first_name"
                                        isInvalid={errors.first_name && touched.first_name}
                                        onChange={handleChange}
                                    />
                                    {errors.first_name && touched.first_name && <Form.Control.Feedback type="invalid">
                                        {errors.first_name}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" placeholder="Last name" value={values?.last_name || " "}
                                        name="last_name"
                                        isInvalid={errors.last_name && touched.last_name}
                                        onChange={handleChange}
                                    />
                                    {errors.last_name && touched.last_name && <Form.Control.Feedback type="invalid">
                                        {errors.last_name}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                            {/* <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="address">
                                    <Form.Label>Address 1</Form.Label>
                                    <Form.Control type="text" placeholder="Address 1"
                                        value={values?.address}
                                        name="address"
                                        onChange={handleChange}

                                    />
                                </Form.Group>
                            </Col> */}
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="add2">
                                    <Form.Label>Address </Form.Label>
                                    <Form.Control type="text" placeholder="Address "
                                        value={values?.address2 || " "}
                                        name="address2"
                                        isInvalid={errors.address2 && touched.address2}
                                        onChange={handleChange}

                                    />
                                    {errors.address2 && touched.address2 && <Form.Control.Feedback type="invalid">
                                        {errors.address2}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="City"
                                        value={values?.city || " "}
                                        name="city"
                                        isInvalid={errors.city && touched.city}
                                        onChange={handleChange}
                                    />
                                    {errors.city && touched.city && <Form.Control.Feedback type="invalid">
                                        {errors.city}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="state">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="text" placeholder="State"
                                        value={values?.statee || " "}
                                        name="statee"
                                        isInvalid={errors.statee && touched.statee}
                                        onChange={handleChange}

                                    />
                                    {errors.statee && touched.statee && <Form.Control.Feedback type="invalid">
                                        {errors.statee}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="province">
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control type="text" placeholder="Province"
                                        value={values?.provence || " "}
                                        name="provence"
                                        isInvalid={errors.provence && touched.provence}
                                        onChange={handleChange} />
                                    {errors.provence && touched.provence && <Form.Control.Feedback type="invalid">
                                        {errors.provence}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="Country">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" placeholder="Country"
                                        value={values?.country || " "}
                                        name="country"
                                        isInvalid={errors.country && touched.country}
                                        onChange={handleChange} />
                                    {errors.country && touched.country && <Form.Control.Feedback type="invalid">
                                        {errors.provence}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="pscode">
                                    <Form.Label>Postal code</Form.Label>
                                    <Form.Control type="text" placeholder="Postal code"
                                        value={values?.postal_code || " "}
                                        name="postal_code"
                                        isInvalid={errors.postal_code && touched.postal_code}
                                        onChange={handleChange}
                                    />
                                    {errors.postal_code && touched.postal_code && <Form.Control.Feedback type="invalid">
                                        {errors.postal_code}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="ph1">
                                    <Form.Label>Phone 1</Form.Label>
                                    <Form.Control type="number" placeholder="Phone 1"
                                        value={values?.phone1 || " "}
                                        name="phone1"
                                        isInvalid={errors.phone1 && touched.phone1}
                                        onChange={handleChange}

                                    />
                                    {errors.phone1 && touched.phone1 && <Form.Control.Feedback type="invalid">
                                        {errors.phone1}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="ph2">
                                    <Form.Label>Phone 2</Form.Label>
                                    <Form.Control type="number" placeholder="Phone 2"
                                        value={values?.phone2 || " "}
                                        name="phone2"
                                        onChange={handleChange}
                                        isInvalid={errors.phone2 && touched.phone2}

                                    />
                                    {errors.phone2 && touched.phone2 && <Form.Control.Feedback type="invalid">
                                        {errors.phone2}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="lang">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control type="text" placeholder="Language"

                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="wallet">
                                    <Form.Label>Wallet</Form.Label>
                                    <Form.Control type="text" placeholder="Wallet type"

                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="wallet id">
                                    <Form.Label>Wallet ID</Form.Label>
                                    <Form.Control type="text" placeholder="Wallet ID" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="NFt">
                                    <Form.Label>NFT description</Form.Label>
                                    <Form.Control type="text" placeholder="NFT description" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="Company">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control type="text" placeholder="Company"
                                        value={values?.company || " "}
                                        isInvalid={errors.company && touched.company}
                                        name="company"
                                        onChange={handleChange}

                                    />
                                    {errors.company && touched.company && <Form.Control.Feedback type="invalid">
                                        {errors.company}
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            </Col>
                        </Row>


                        <CustomButton customClass={'profileBtn'} onClick={handleSubmit} >
                            {isSubmitting ? (<Spinner animation="border" role="status">
                            </Spinner>) : 'Update'}
                        </CustomButton>
                    </Form>


                )}
            </Formik>

        </div>
    )
}

export default ProfileData