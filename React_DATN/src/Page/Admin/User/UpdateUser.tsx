import React, { useEffect, useState } from 'react';
import { Button, Empty, Form, Input, Select, message } from 'antd';
import { useUpdateUserMutation, useGetOneUserQuery } from '../../../Services/Api_User';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { QuestionCircleOutlined } from "@ant-design/icons"
import Loading from '../../../Component/Loading';


const UpdateUser = () => {
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [getList, setList]: any = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading, error }: any = useGetOneUserQuery(id);
  const [updateUser] = useUpdateUserMutation();


  const onFinish = (values: any) => {
    const dataUser: any = { ...values, role: getList };
    dataUser.username.length < 3 && messageApi.open({ type: "error", content: "Tên tài khoản trên 2 kí tự !" });
    dataUser.password.length < 6 && messageApi.open({ type: "error", content: "Mật khẩu phải trên 5 kí tự !" });
    if (dataUser.email.includes("@gmail.com")) {
      if (dataUser.role == "list-0") {
        messageApi.open({ type: "error", content: "Hãy chọn vai trò đúng !" });
      } else {
        if (dataUser.role == "") {
          messageApi.open({ type: "error", content: "Hãy chọn lại vai trò !" });
        } else {
          const dataUserUpadte = { ...dataUser, _id: id }
          updateUser(dataUserUpadte).unwrap().then(() => {
            messageApi.open({
              type: "success",
              content: `Cập nhật thành công tài khoản: ${dataUser.username} ! vui lòng đợi trong giây lát để quay lại.`
            });
            setTimeout(() => {
              navigate(`/admin/user/list`)
            }, 2300);
          });
        }

      };
    } else {
      messageApi.open({
        type: "error",
        content: "Không đúng định dạng email."
      });
    }

  };

  const handleChange = (value: string) => { setList(value) };
  const selectOptions = [
    { label: 'Lựa chọn', value: 'list-0' },
    { label: 'Nhân viên', value: 'staff' },
    { label: 'Người dùng', value: 'client' },
  ];


  return (
    <div>
      <h1 className='text-center text-2xl mb-2'>Cập nhật tài khoản</h1><hr />
      <p className='text-red-400'>(*) lưu ý: Nếu tài khoản là admin và cập nhật lại vai trò khác thì lần tới login bạn sẽ mất quyền của admin.</p>
      {contextHolder}
      {!isLoading ?
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            username: data?.data.username || '',
            email: data?.data.email || '',
            password: data?.data.password || '',
            role: data?.data.role || '',
          }}
        >
          <Form.Item
            label="Tên tài khoản"
            name="username"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value && !getFieldValue('username')) {
                    return Promise.reject(new Error('Bắt buộc nhập tên!'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value && !getFieldValue('email')) {
                    return Promise.reject(new Error('Bắt buộc nhập email!'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value && !getFieldValue('password')) {
                    return Promise.reject(new Error('Bắt buộc nhập mật khẩu !'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
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
        : <Loading />}
    </div>
  )
}

export default UpdateUser