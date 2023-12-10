import { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import { useVerificationCodesMutation } from '../Services/Api_User';
import Loading from '../Component/Loading';
import { Link } from 'react-router-dom';


const VerificationCodes = () => {
    const [verificationCode, { error }] = useVerificationCodesMutation()
    const [messageApi, contexHolder] = message.useMessage()
    const [isLoadingSeen, setIsLoadingSeen] = useState(false)
    const [countdown, setCountdown] = useState(179);

    

    useEffect(() => {
        if (error && "data" in error) {
            const errDetails = error.data as { message: string }
            messageApi.open({
                type: "error",
                content: errDetails.message
            })
        }
    }, [error])

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (!isLoadingSeen && countdown > 0) {
            interval = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isLoadingSeen, countdown]);

    const formatTime = (timeInSeconds:number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const onFinish = async (values: any) => {
        setIsLoadingSeen(true)
        try {
            const response = await verificationCode(values)
            if ("data" in response) {
                messageApi.open({
                    type: "success",
                    content: response.data.message
                })
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Đã có lỗi xảy ra vui lòng thử lại"
            })
        }
        setIsLoadingSeen(false)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='mt-36'>
            {contexHolder}
            {isLoadingSeen && <Loading />}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', }}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 17 }}
                    style={{ width: "800px", border: '1px solid #ccc', borderRadius: '20px', paddingTop: 20, paddingLeft: -30, background: "#ebebeb" }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    </Form.Item>
                    <Link to={`/login`} className='underline'><img title='back' className='w-6 h-6 hover:-translate-x-[3px] duration-200 ml-10' src="../../img/IMAGE_CREATED/previous.png" alt="" /></Link>
                    <h1 className='text-center '>Xác thực tài khoản</h1>
                    <h5 style={{ marginTop: 10, textAlign: "center", marginBottom: 60, color: "green" }}>Vui lòng điền tên email và mã code.</h5>

                    <Form.Item
                        label={<span style={{ color: '#2b2b2b' }}>Email</span>}
                        name="email"
                        style={{ color: 'lightgray' }}
                        rules={[
                            { required: true, message: 'Email không được để trống!' },
                            {
                                type: 'email',
                                message: 'Email không hợp lệ!',
                            },
                        ]}
                    >
                        <Input style={{ height: 40, width: 500 }} placeholder='vui lòng nhập lại địa chỉ email' />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: '#2b2b2b' }}>Mã số</span>}
                        name="code"
                        style={{ color: 'lightgray' }}
                        rules={[{ required: true, message: 'Mã code không được bỏ trống' }]}
                    >
                        <Input style={{ height: 40, width: 500 }} placeholder='nhập mã code' />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 5, span: 11 }}>
                        <div style={{ textAlign: 'center', marginTop: '10px',marginLeft: 25 }}>
                            <p>Mã xác thực chỉ có hiệu lực trong vòng 2 phút: {formatTime(countdown)}</p>
                        </div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 11 }}>
                        <Button type="primary" htmlType="submit" style={{ width: '30%', display: 'block', border: '1px solid red', background: 'none', color: 'red' }}>
                            Gửi
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default VerificationCodes