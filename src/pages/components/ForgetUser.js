import React from 'react'

import { Form } from 'react-bootstrap'
import MainCard from '../common/MainCard'

import style from '../styles/login.module.scss'
import { routes } from '../../routes'
import { Link } from 'react-router-dom'

import logo from '../../images/logonft.png'
import CustomButton from '../common/Button'

const ForgetUser = () => {
    return (
        <MainCard>
            <div className={style.login} >
                <div className={'text-center mt-3 mb-4 '}>
                    <img src={logo} alt={'logo'} />
                </div>
                <div>
                    <h2>Forget Password</h2>
                    <p>Enter your Email address here so we can send you reset password  </p>
                </div>
                <div>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <CustomButton text='Send' customClass={style.explore} />
                        <div className='text-center'>
                            <Link to={routes.signup} className={style.signup} >Dont have an Account?</Link>
                        </div>
                    </Form>

                </div>
            </div>
        </MainCard>
    )
}

export default ForgetUser