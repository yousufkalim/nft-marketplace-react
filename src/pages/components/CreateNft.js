import React from 'react'
import { Row, Container, Col, Form } from 'react-bootstrap'

import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import CustomButton from '../common/Button';


const CreateNFT = () => {


    return (
        <Container>
            <div className='white-bg'>
                <h2 className='text-center mb-5 pt-3'>Create Collection</h2>
                <Formik
                    initialValues={{
                        description_short: '',
                        description_long: '',
                        image_small_location: '',
                        image_large_location: false,
                        store_name: '',
                        image_banner_location: '',
                        category_code: "",
                        url_personal: '',
                        url_instagram: "",
                        url_discord: "",
                        url_media: "",
                        url_time: "",
                        is_explicit: "",
                        minting_coin: "",
                        layout_style_code: "",
                        minting_supply_count: "",
                        mint_locked: "",
                        after_1st_purchase_text: "",
                        url_name: "",
                        mintable: ""
                    }
                    }
                    validationSchema={Yup.object().shape({
                        user_id: Yup.string().required('feild is required'),
                        description_short: Yup.string().required('feild is required'),
                        store_name: Yup.string().required('feild is required'),
                        created_by: Yup.string().required('feild is required'),
                        category_code: Yup.string().required('feild is required'),
                        mintable: Yup.string().required('feild is required'),
                        minting_coin: Yup.string().required('feild is required'),
                        minting_coin: Yup.string().required('feild is required'),



                    })}
                >
                    <Form>
                        <Row>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Small Image</Form.Label>
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
                                    <Form.Control type="email" placeholder="Store Name" />
                                </Form.Group>

                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="sd">
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control type="email" placeholder="Short Description " />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="ld">
                                    <Form.Label>Long Description</Form.Label>
                                    <Form.Control type="email" placeholder="Long Description" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Catagory</Form.Label>

                                    <Form.Select aria-label="1">
                                        <option value="1">ART</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="ilink">
                                    <Form.Label>Personal Link</Form.Label>
                                    <Form.Control type="email" placeholder="Personal Link" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="plink">
                                    <Form.Label>Instagram Link</Form.Label>
                                    <Form.Control type="email" placeholder="Instagram Link " />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="dlink">
                                    <Form.Label>Discord Link</Form.Label>
                                    <Form.Control type="email" placeholder="Discord Link" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="me">
                                    <Form.Label>Media Link</Form.Label>
                                    <Form.Control type="email" placeholder="Media Link" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="ms">
                                    <Form.Label>Minting Supply</Form.Label>
                                    <Form.Control type="email" placeholder="Minting Supply" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Group className="mb-3" controlId="af">
                                    <Form.Label>After Purchase Price</Form.Label>
                                    <Form.Control type="number" placeholder="After Purchase price" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={12}>
                                <Form.Group className="mb-3" controlId="mcoin">
                                    <Form.Label>Minting Coin</Form.Label>
                                    <Form.Control type="email" placeholder="Minting Coin" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Check
                                    inline
                                    label="Active"
                                    name="Active"
                                    type={'checkbox'}

                                />
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Check
                                    inline
                                    label="Explicit"
                                    name="Explicit"
                                    type={'checkbox'}

                                />
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Form.Check
                                    inline
                                    label="Mintable"
                                    name="Mintable"
                                    type={'checkbox'}

                                />
                            </Col>

                        </Row>
                        <CustomButton text={'Create'} customClass={'profileBtn'} />
                    </Form>
                </Formik>


            </div>
        </Container>
    )
}

export default CreateNFT