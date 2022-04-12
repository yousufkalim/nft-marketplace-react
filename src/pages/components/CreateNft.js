import React, { useState } from 'react'
import { Row, Container, Col, Form, Spinner } from 'react-bootstrap'

import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from '../../api/instance'
import CustomButton from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '../../routes';


const CreateNFT = () => {
    const navigate = useNavigate();
    const code = useSelector(state => state?.code?.cata)

    const [loading, isLoading] = useState(false)

    return (
        <Container>
            <div className='white-bg'>
                <h2 className='text-center mb-5 pt-3'>Create Collection</h2>
                <Formik
                    initialValues={{
                        description_short: '',
                        description_long: '',
                        image_small_location: 'sdsd',
                        image_large_location: false,
                        store_name: '',
                        image_banner_location: 'ssds',
                        category_code: "",
                        url_personal: '',
                        url_instagram: "",
                        url_discord: "",
                        url_media: "",
                        url_time: "",
                        is_explicit: false,
                        minting_coin: "",
                        layout_style_code: "",
                        minting_supply_count: false,
                        mint_locked: false,
                        after_1st_purchase_text: "",
                        url_name: "",
                        mintable: false
                    }
                    }

                    validationSchema={Yup.object().shape({
                        description_short: Yup.string().required('feild is required'),
                        store_name: Yup.string().required('feild is required'),

                        mintable: Yup.string().required('feild is required'),
                        minting_coin: Yup.string().required('feild is required'),

                    })}
                    onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                        isLoading(true)
                        // console.log(values)
                        try {

                            axios.post('/collections/create',

                                {
                                    description_short: values.description_short,
                                    description_long: values.description_long,
                                    image_small_location: 'sdsdsd',
                                    image_large_location: 'sdsdsd',
                                    store_name: values.store_name,
                                    image_banner_location: 'sdsdsd',
                                    category_code: values.category_code,
                                    url_personal: values.url_personal,
                                    url_instagram: values.url_instagram,
                                    url_discord: values.url_discord,
                                    url_media: values.url_media,
                                    created_by: "test",
                                    created_date: "test",
                                    is_explicit: 1,
                                    minting_coin: values.minting_coin,
                                    layout_style_code: values.layout_style_code,
                                    minting_supply_count: 1,
                                    mint_locked: 1,
                                    after_1st_purchase_text: values.after_1st_purchase_text,
                                    url_name: "test",
                                    mintable: 1,
                                    url_time: "test",

                                }
                            )
                                .then(function (response) {


                                    //     type: ACCOUNT_INITIALIZE,
                                    //     payload: { isLoggedIn: true, user: response.data.body.user, token: response.data.body.token }
                                    // });


                                    if (response.data.status === 200) {

                                        setStatus({ success: true });
                                        setSubmitting(false);
                                        isLoading(false)
                                        toast.dark('Sucessfully Created!')
                                        setTimeout(() => {
                                            navigate(routes.home)
                                        }, 1000);


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

                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            isLoading(false)
                            toast.dark(err.message)
                            setSubmitting(false);

                        }
                    }

                    }

                >
                    {({ errors, handleChange, handleSubmit, isSubmitting, values,
                    }) => (
                        <>
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={12} md={6} lg={4}>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Small Image</Form.Label>
                                            <Form.Control type="file"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Large Image</Form.Label>
                                            <Form.Control type="file" />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Large Image</Form.Label>
                                            <Form.Control type="file" />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>
                                        <Form.Group className="mb-3" controlId="StoreName">
                                            <Form.Label>Store Name</Form.Label>
                                            <Form.Control type="email" placeholder="Store Name"
                                                value={values.store_name}
                                                name="store_name"
                                                isInvalid={errors.store_name}

                                                onChange={handleChange}

                                            />
                                        </Form.Group>

                                    </Col>
                                    <Col xs={12} md={6} lg={4}>
                                        <Form.Group className="mb-3" controlId="sd">
                                            <Form.Label>Short Description</Form.Label>
                                            <Form.Control type="email" placeholder="Short Description "
                                                value={values.description_short}
                                                name="description_short"
                                                isInvalid={errors.description_short}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>
                                        <Form.Group className="mb-3" controlId="ld">
                                            <Form.Label>Long Description</Form.Label>
                                            <Form.Control type="email" placeholder="Long Description"
                                                value={values.description_long}
                                                name="description_long"
                                                isInvalid={errors.description_long}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>
                                        <Form.Group className="mb-3" controlId="lastName">
                                            <Form.Label>Catagory</Form.Label>

                                            <Form.Select aria-label="1"
                                                value={values.category_code.name}
                                                name="category_code"
                                                onChange={handleChange}
                                            >

                                                {code?.map((e, i) => (
                                                    <option key={i} value={`${e.Code}`} >{e.Code}</option>
                                                ))}


                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>
                                        <Form.Group className="mb-3" controlId="ilink">
                                            <Form.Label>Personal Link</Form.Label>
                                            <Form.Control type="email" placeholder="Personal Link"
                                                value={values.url_personal}
                                                name="url_personal"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>
                                        <Form.Group className="mb-3" controlId="plink">
                                            <Form.Label>Instagram Link</Form.Label>
                                            <Form.Control type="email" placeholder="Instagram Link "
                                                value={values.url_instagram}
                                                name="url_instagram"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>
                                        <Form.Group className="mb-3" controlId="dlink">
                                            <Form.Label>Discord Link</Form.Label>
                                            <Form.Control type="email" placeholder="Discord Link"
                                                value={values.url_discord}
                                                name="url_discord"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>
                                        <Form.Group className="mb-3" controlId="me">
                                            <Form.Label>Media Link</Form.Label>
                                            <Form.Control type="email" placeholder="Media Link"
                                                value={values.url_media}
                                                name="url_media"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>
                                        <Form.Group className="mb-3" controlId="ms">
                                            <Form.Label>Minting Supply</Form.Label>
                                            <Form.Control type="email" placeholder="Minting Supply"
                                                value={values.minting_supply_count}
                                                name="minting_supply_count"
                                                isInvalid={errors.minting_supply_count}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={6}>
                                        <Form.Group className="mb-3" controlId="af">
                                            <Form.Label>After Purchase Price</Form.Label>
                                            <Form.Control type="number" placeholder="After Purchase price"
                                                value={values.after_1st_purchase_text}
                                                name="after_1st_purchase_text"
                                                onChange={handleChange}

                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={6}>
                                        <Form.Group className="mb-3" controlId="mcoin">
                                            <Form.Label>Minting Coin</Form.Label>
                                            <Form.Control type="email" placeholder="Minting Coin"

                                                value={values.minting_coin}
                                                name="minting_coin"
                                                isInvalid={errors.minting_coin}
                                                onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>

                                        <label className="d-flex align-items-center" style={{ gap: '3px' }}>
                                            <Field type="checkbox" name="Active" />
                                            Active
                                        </label>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>

                                        <label className="d-flex align-items-center" style={{ gap: '3px' }}>
                                            <Field type="checkbox" name="is_explicit" />
                                            Explicit
                                        </label>
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>

                                        <label className="d-flex align-items-center" style={{ gap: '3px' }}>
                                            <Field type="checkbox" name="mintable" />
                                            Mintable
                                        </label>
                                    </Col>

                                </Row>

                                <CustomButton customClass={'profileBtn'} onClick={handleSubmit} >
                                    {isSubmitting ? (<Spinner animation="border" role="status">
                                    </Spinner>) : 'Create'}
                                </CustomButton>
                            </Form>
                        </>
                    )}

                </Formik>


            </div>
        </Container>
    )
}

export default CreateNFT