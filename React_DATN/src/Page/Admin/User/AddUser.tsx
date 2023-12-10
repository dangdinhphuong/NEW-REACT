import React, { useState } from 'react';
import { useAddUserMutation } from '../../../Services/Api_User';
import { Button, Select, message, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';



const AddUser = () => {
    const [getList, setList]: any = useState("");
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [addUser] = useAddUserMutation();
    const handleChange = (value: string) => { setList(value) };
    const onFinish = (values: any) => {
        const dataUser = { ...values, role: getList };
        dataUser.username.length < 3 && messageApi.open({ type: "error", content: "Tên tài khoản trên 2 kí tự !" });
        dataUser.password.length < 6 && messageApi.open({ type: "error", content: "Mật khẩu phải trên 5 kí tự !" });
        if (dataUser.email.includes("@gmail.com")) {
            if (dataUser.role == "list-0") {
                messageApi.open({ type: "error", content: "Hãy chọn vai trò đúng !" });
            } else {
                addUser(dataUser).unwrap().then(() => {
                    messageApi.open({
                        type: "success",
                        content: "Đã thêm 1 tài khoản mới ! vui lòng đợi trong giây lát để quay lại."
                    });
                    setTimeout(() => {
                        navigate(`/admin/user/list`)
                    }, 2300);
                });
            };
        } else {
            messageApi.open({
                type: "error",
                content: "Không đúng định dạng email."
            });
        }
    };
    const selectOptions = [
        { label: 'Lựa chọn', value: 'list-0' },
        { label: 'Nhân viên', value: 'staff' },
        { label: 'Người dùng', value: 'client' },
    ];
    return (
        <div>
            {contextHolder}
            <h1 className='text-center text-2xl mb-2'>Thêm tài khoản mới</h1><hr />

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên tài khoản"
                    name="username"
                    rules={[{ required: true, message: 'Bắt buộc nhập tên !' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Bắt buộc nhập email !' }]}
                >
                    <Input />
                    {/* {!validEmail?<span className='text-red-500'>Không đúng địng dạng email !</span>:""} */}
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Bắt buộc nhập mật khẩu !' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Vai trò"
                    name="role"
                    rules={[{ required: true, message: 'Vui lòng chọn một vai trò cho account này !' }]}
                >
                    <Select
                        defaultValue="list-0"
                        style={{ width: 333 }}
                        onChange={handleChange}
                        options={selectOptions}
                    />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button className='mr-2' style={{ backgroundColor: "green", color: "white" }} htmlType="submit">
                        Đồng ý
                    </Button>
                    <Link to={`/admin/user/list`}>
                        <Button style={{ backgroundColor: "gray", color: "white" }} htmlType="submit">
                            Quay lại
                        </Button>
                    </Link>
                </Form.Item>
            </Form>

        </div>
    )
}

export default AddUser