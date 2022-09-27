import { Form , Button ,Input, Select   } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Spin from '../../../components/presentational/Spin'
import { codesAPI } from '../../../services/createCollectionServices'
import './index.scss'

const Security = () => {
  const [loading,setLoading]=useState(false)
  const [securityQuestions,setSecurityQuestions]=useState([])
  const onFinish=(values)=>{

  }
  const onFinishFailed=()=>{

  }

  useEffect(() => {
    const getQuestionsCode = async () => {
      const res = await codesAPI("Security Questions");
      setSecurityQuestions(res?.data?.body);
    };
    getQuestionsCode();
  }, []);

  console.log("securityQuestions",securityQuestions);

  return (
    <div className='securityWrapper'>
    <div className='heading'>Security Questions</div>
    <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
              >
                <Form.Item
                  name="question"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your username or email!",
                    },
                  ]}
                >
                  <Select placeholder="Select Your Question">
                    {securityQuestions?.slice(0,4)?.map((item, index) => {
                      return (
                        <Select.Option value={item?.code} key={item?.code}>
                          {item?.description}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="answer"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your answer!",
                    },
                  ]}
                >
                 <Input.TextArea placeholder='Type Your Answer Here' />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {loading ? <Spin /> : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
    </div>
  )
}

export default Security