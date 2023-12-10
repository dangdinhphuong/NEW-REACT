import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from 'antd';
import { useSignupMutation } from '../Services/Api_User';

const Register = () => {
    const navigate = useNavigate();
    const [setMessage, getMessage] = message.useMessage();
    const [signup]: any = useSignupMutation();

    const onFinish = async (values: any) => {
        try {
            console.log("values: ", values);
            values.username.length < 3 && setMessage.open({ type: "error", content: "Tên tài khoản trên 2 kí tự !" });
            values.password.length < 6 && setMessage.open({ type: "error", content: "Mật khẩu phải trên 5 kí tự !" });
            values.password != values.confirmPassword && setMessage.open({ type: "error", content: "Mật khẩu không trùng nhau !" });
            if (values.email.includes("@gmail.com")) {
                signup(values)
                    .unwrap()
                    .then(() => {
                        setMessage.open({
                            type: "success",
                            content: "Đăng kí tài khoản thành công.",
                        });
                        setTimeout(() => {
                            navigate("/login");
                        }, 1800);
                    });
            } else {
                setMessage.open({
                    type: "error",
                    content: "Không đúng định dạng email."
                });
            }
        } catch (err) {
            console.log("Lỗi try-catch đăng kí: ", err);
        };
    };

    return (
        <div className='w-[90vw] mx-auto mt-44'>
            {getMessage}
            <div className="login-area mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-md-3 text-center">
                            <div className="login">
                                <div className="login-form-container">
                                    <Link to={`/login`} className='underline'><img title='back' className='w-6 h-6 hover:-translate-x-[3px] duration-200' src="../../img/IMAGE_CREATED/previous.png" alt="" /></Link>
                                    <div className="login-text">

                                        <h2>Đăng kí</h2>
                                        <h5 style={{ marginTop: 10, textAlign: "center", marginBottom: 60, color: "green" }}>Vui lòng điền các thông tin cần thiết.</h5>
                                    </div>
                                    <div className="logup-form">
                                        <Form
                                            name="basic"
                                            labelCol={{
                                                span: 6,
                                            }}
                                            wrapperCol={{
                                                span: 16,
                                            }}
                                            style={{
                                                maxWidth: 600,
                                            }}
                                            initialValues={{
                                                remember: true,
                                            }}
                                            onFinish={onFinish}
                                            autoComplete="off"
                                        >
                                            <Form.Item
                                                label="Tên tài khoản"
                                                name="username"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your user name!',
                                                    },
                                                ]}
                                            >
                                                <Input maxLength={16} />
                                            </Form.Item>

                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your email!',
                                                    },
                                                ]}
                                            >
                                                <Input type='email' />
                                            </Form.Item>

                                            <Form.Item
                                                label="Mật khẩu"
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your password!',
                                                    },
                                                ]}
                                            >
                                                <Input type='password' />
                                            </Form.Item>
                                            <Form.Item
                                                label="Nhập lại mật khẩu"
                                                name="confirmPassword"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your re-password!',
                                                    },
                                                ]}
                                            >
                                                <Input type='password' />
                                            </Form.Item>

                                            <Form.Item
                                                wrapperCol={{
                                                    offset: 8,
                                                    span: 16,
                                                }}
                                            >
                                                <Button htmlType="submit" className='w-36'>Đăng kí</Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register