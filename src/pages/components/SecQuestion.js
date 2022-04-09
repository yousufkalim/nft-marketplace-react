import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'

import CustomButton from '../common/Button';

const SecQuestion = () => {
    return (
        <div className='white-bg'>
            <h2>Security Questions</h2>
            <Form>
                <Row>
                    <Col xs={12} md={6} lg={6}>
                        <Form.Select aria-label="Default select example">
                            <option>Question 1</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="q1">
                            <Form.Control type="email" placeholder="Answer 1 " />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                        <Form.Select aria-label="Default select example">
                            <option>Question 2</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="q1">
                            <Form.Control type="email" placeholder="Answer 1 " />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Form.Select aria-label="Default select example">
                            <option>Question 3</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="q1">
                            <Form.Control type="email" placeholder="Answer 1 " />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Form.Select aria-label="Default select example">
                            <option>Question 4</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="q1">
                            <Form.Control type="email" placeholder="Answer 1 " />
                        </Form.Group>
                    </Col>



                </Row>
                <CustomButton text={'Update'} customClass={'profileBtn'} />
            </Form>
        </div>
    )
}

export default SecQuestion