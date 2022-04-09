import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'

import CustomButton from '../common/Button';

const PasswordChange = () => {
    return (
        <div className='white-bg'>
            <h2>Update Password</h2>
            <Form>
                <Row>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="curentpass">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" placeholder="Current Password" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="newpass">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="New Password " />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group className="mb-3" controlId="conpassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                    </Col>

                </Row>
                <CustomButton text={'Update'} customClass={'profileBtn'} />
            </Form>
        </div>
    )
}

export default PasswordChange