import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useSiginMutation } from '../Services/Api_User';
import { IUser } from '../Models/interfaces';
import Loading from '../Component/Loading';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [sigin, { error }] = useSiginMutation();
    const [isLoadingSeen, setIsLoadingSeen] = useState(false);
    const [messageApi, contexHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        setIsLoadingSeen(true);
        try {
            const { data }: any = await sigin(values);
            localStorage.setItem("token", `"${data.accessToken}"`);
            localStorage.setItem("user", JSON.stringify(data.user))

            messageApi.open({
                type: "success",
                content: "Đăng nhập thành công"
            });
            // setTimeout(()=>{
            //     window.location.href=window.location.origin;
            // },2000);
            const { role } = data.user;

            if (role === "admin" || role === "staff") {
                window.location.href = '/admin';
            } else {
                window.location.href = '/';
            }
        } catch (error) {
        }
        setIsLoadingSeen(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        if (error) {
            if ("data" in error) {
                const errorData = error.data as { message: string };
                messageApi.open({
                    type: "error",
                    content: errorData?.message
                })
            }
        }
    }, [error]);
    return (
        <div className='mt-36'>
            {contexHolder}
            {isLoadingSeen && <Loading />}
            <div className='' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', }}>

                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 17 }}
                    style={{ width: "800px", border: '1px solid #ccc', borderRadius: '20px', paddingTop: 10, paddingLeft: -30, background: "#ebebeb" }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    </Form.Item>
                    <h1 className='text-center '>Đăng nhập</h1>
                    <h5 style={{ marginTop: 10, textAlign: "center", marginBottom: 60, color: "green" }}>Vui lòng điền thông tin đăng nhập bên dưới.</h5>


                    <Form.Item
                        label={<span style={{ color: '#2b2b2b' }}>Email</span>}
                        name="email"
                        style={{ color: 'lightgray' }}
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input style={{ height: 40, width: 500 }} />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"

                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password style={{ height: 40, width: 500 }} />
                    </Form.Item>

                    <Form.Item valuePropName="checked" wrapperCol={{ offset: 6, span: 17 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 11 }}>
                        <Button type="primary" htmlType="submit" style={{ width: '30%', display: 'block', border: '1px solid green', background: 'none', color: 'green' }}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <div className="flex justify-around">
                        <Link to={`/forgot-password`}>Quên mật khẩu ?</Link>
                        <p className=''>Bạn chưa có tài khoản, <Link to={`/register`}>đăng kí</Link> ngay !</p>
                    </div>
                </Form>
            </div>
        </div>
    )

};

export default Login;