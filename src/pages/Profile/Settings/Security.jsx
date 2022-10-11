import { Form, Button, Input } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Spin from "../../../components/presentational/Spin";
import { openNotification } from "../../../components/Smart/Notification";
import { VerifyUser } from "../../../services/authServices";
import { codesAPI } from "../../../services/createCollectionServices";
import { updateQuestionsAPI } from "../../../services/userServices";
import { setProfile } from "../../../store/auth/authActions";
import "./index.scss";

const Security = () => {
  const [loading, setLoading] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [codes, setCodes] = useState([]);
  const dispatch=useDispatch()
  const user=useSelector(state=>state?.auth?.user)

  const onFinish = async (values) => {
    setLoading(true);
    const data = {
      question1: codes[0],
      question2: codes[1],
      question3: codes[2],
      question4: codes[3],
      answer1: values?.answer1,
      answer2: values?.answer2,
      answer3: values?.answer3,
      answer4: values?.answer4,
      has_questions: 1,
    };
    try {
      const res = await updateQuestionsAPI(data);
      const user = await VerifyUser();
      dispatch(setProfile(user));
      setLoading(false);
      openNotification("Success", "Questions Updated Successfully");
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      // openNotification("Error",error)
    }
  };
  const onFinishFailed = () => {};

  const getSecurityQuestionsCode = () => {
    const QuestionsCodes = securityQuestions?.slice(0, 4)
    ?.map((item) => {
      return item?.code;
    });
    setCodes(QuestionsCodes);
  };

  useEffect(() => {
    const getQuestionsCode = async () => {
      const res = await codesAPI("Security Questions");
      setSecurityQuestions(res?.data?.body);
    };
    getQuestionsCode();
  }, []);

  useEffect(() => {
    getSecurityQuestionsCode();
  }, [securityQuestions]);

  return (
    <div className="securityWrapper">
      <div className="heading">Security Questions</div>
      <Form
        name="basic"
        initialValues={{
          answer1:user?.answer1 ?? '',
          answer2:user?.answer2 ?? '',
          answer3:user?.answer3 ?? '',
          answer4:user?.answer4 ?? ''
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        {securityQuestions?.slice(0, 4)?.map((item, index) => {
          return (
            <Form.Item
              name={`answer${index + 1}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label={
                <>
                  <span className={"QuestionsHeading"}>
                    {`Question ${index + 1}:`}
                  </span>
                  {item?.description}
                </>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your answer!",
                },
              ]}
            >
              <Input placeholder="Type Your Answer Here" />
            </Form.Item>
          );
        })}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {loading ? <Spin /> : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Security;
