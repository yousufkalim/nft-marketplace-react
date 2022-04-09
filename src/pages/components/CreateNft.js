// import React from 'react'
// import { Row, Col, Form } from 'react-bootstrap'

// import { Field, Formik } from 'formik'
// import * as Yup from 'yup';
// import { toast } from 'react-toastify';

// import CustomButton from '../common/Button';


// const CreateNFT = () => {


//     return (
//         <div className='white-bg'>
//             <h2>Create Collection</h2>
//             <Formik
//                 initialValues={{
//                     description_short: '',
//                     description_long: '',
//                     image_small_location: '',
//                     image_large_location: false,
//                     store_name: '',
//                     image_banner_location: '',
//                     category_code: "",
//                     url_personal: '',
//                     url_instagram: "",
//                     url_discord: "",
//                     url_media: "",
//                     url_time: "",
//                     is_explicit: "",
//                     minting_coin: "",
//                     layout_style_code: "",
//                     minting_supply_count: "",
//                     mint_locked: "",
//                     after_1st_purchase_text: "",
//                     url_name: "",
//                     mintable: ""
//                 }
//                 }
//                 validationSchema={Yup.object().shape({
//                     user_id: Yup.string().required('feild is required'),
//                     description_short: Yup.string().required('feild is required'),
//                     store_name: Yup.string().required('feild is required'),
//                     created_by: Yup.string().required('feild is required'),
//                     category_code: Yup.string().required('feild is required'),
//                     mintable: Yup.string().required('feild is required'),
//                     minting_coin: Yup.string().required('feild is required'),
//                     minting_coin: Yup.string().required('feild is required'),



//                 })}
//             >
//                 <Form>
//                     <Row>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="username">
//                                 <Form.Label>User name</Form.Label>
//                                 <Form.Control type="email" placeholder="Username" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="Email">
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control type="email" placeholder="Email " />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="firstName">
//                                 <Form.Label>First name</Form.Label>
//                                 <Form.Control type="email" placeholder="First name" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="lastName">
//                                 <Form.Label>Last name</Form.Label>
//                                 <Form.Control type="email" placeholder="Last name" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="add">
//                                 <Form.Label>Address 1</Form.Label>
//                                 <Form.Control type="email" placeholder="Address" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="add2">
//                                 <Form.Label>Address 2</Form.Label>
//                                 <Form.Control type="email" placeholder="Address 2" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="city">
//                                 <Form.Label>City</Form.Label>
//                                 <Form.Control type="email" placeholder="City" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="state">
//                                 <Form.Label>State</Form.Label>
//                                 <Form.Control type="email" placeholder="State" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="province">
//                                 <Form.Label>Province</Form.Label>
//                                 <Form.Control type="email" placeholder="Province" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="Country">
//                                 <Form.Label>Country</Form.Label>
//                                 <Form.Control type="email" placeholder="Country" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="pscode">
//                                 <Form.Label>Postal code</Form.Label>
//                                 <Form.Control type="email" placeholder="Postal code" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="ph1">
//                                 <Form.Label>Phone 1</Form.Label>
//                                 <Form.Control type="email" placeholder="Phone 1" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="ph2">
//                                 <Form.Label>Phone 2</Form.Label>
//                                 <Form.Control type="email" placeholder="Phone 2" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="lang">
//                                 <Form.Label>Language</Form.Label>
//                                 <Form.Control type="email" placeholder="Language" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="wallet">
//                                 <Form.Label>Wallet</Form.Label>
//                                 <Form.Control type="email" placeholder="Wallet type" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="wallet id">
//                                 <Form.Label>Wallet ID</Form.Label>
//                                 <Form.Control type="email" placeholder="Wallet ID" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="NFt">
//                                 <Form.Label>NFT description</Form.Label>
//                                 <Form.Control type="email" placeholder="NFT description" />
//                             </Form.Group>
//                         </Col>
//                         <Col xs={12} md={6} lg={4}>
//                             <Form.Group className="mb-3" controlId="Company">
//                                 <Form.Label>Company</Form.Label>
//                                 <Form.Control type="email" placeholder="Company" />
//                             </Form.Group>
//                         </Col>
//                     </Row>
//                     <CustomButton text={'Update'} customClass={'profileBtn'} />
//                 </Form>
//             </Formik>


//         </div>
//     )
// }

// export default CreateNFT