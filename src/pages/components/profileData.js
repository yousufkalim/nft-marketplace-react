import React, { useEffect } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../common/Button';


const ProfileData = () => {
    const state = useSelector(state => state?.authReducer)

    return (
        <div className='white-bg'>
            <h2>General Profile</h2>
            <Form>
                <Row>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>User name</Form.Label>
                            <Form.Control type="email" placeholder="Username" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email " value={state?.email} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="email" placeholder="First name" value={state?.first_name} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="email" placeholder="Last name" value={state?.last_name} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="add">
                            <Form.Label>Address 1</Form.Label>
                            <Form.Control type="email" placeholder="Address" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="add2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control type="email" placeholder="Address 2" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="email" placeholder="City" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="email" placeholder="State" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="province">
                            <Form.Label>Province</Form.Label>
                            <Form.Control type="email" placeholder="Province" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="Country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="email" placeholder="Country" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="pscode">
                            <Form.Label>Postal code</Form.Label>
                            <Form.Control type="email" placeholder="Postal code" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="ph1">
                            <Form.Label>Phone 1</Form.Label>
                            <Form.Control type="email" placeholder="Phone 1" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="ph2">
                            <Form.Label>Phone 2</Form.Label>
                            <Form.Control type="email" placeholder="Phone 2" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="lang">
                            <Form.Label>Language</Form.Label>
                            <Form.Control type="email" placeholder="Language" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="wallet">
                            <Form.Label>Wallet</Form.Label>
                            <Form.Control type="email" placeholder="Wallet type" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="wallet id">
                            <Form.Label>Wallet ID</Form.Label>
                            <Form.Control type="email" placeholder="Wallet ID" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="NFt">
                            <Form.Label>NFT description</Form.Label>
                            <Form.Control type="email" placeholder="NFT description" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="Company">
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="email" placeholder="Company" />
                        </Form.Group>
                    </Col>
                </Row>
                <CustomButton text={'Update'} customClass={'profileBtn'} />
            </Form>
        </div>
    )
}

export default ProfileData