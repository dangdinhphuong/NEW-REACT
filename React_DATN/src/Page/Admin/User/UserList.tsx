import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useGetAllUserQuery } from "../../../Services/Api_User";
import { Divider, Table, Popconfirm, message, Select, Button, Input, Image } from 'antd';
import { DeleteFilled, EditOutlined, RetweetOutlined } from '@ant-design/icons';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Loading from "../../../Component/Loading";
import { useRemoveUserMutation } from '../../../Services/Api_User';



const UserList = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [getList, setList]: any = useState("");
    const [findName, setFindName] = useState([]);
    const [findEmail, setFindEmail] = useState([]);
    const { data, isLoading }: any = useGetAllUserQuery();

    const [removeUser] = useRemoveUserMutation();

    const dataUser = data?.data?.map(({ _id, username, password, email, role, imgUrl,phone,address }: any) => ({
        _id,
        username,
        password,
        email,
        role,
        imgUrl,phone,address
    }))

    const RemoveUser = (_id: string) => {
        removeUser(_id).unwrap().then(() => {
            messageApi.open({
                type: "success",
                content: "Xóa sản phẩm thành công ! "
            });
        });
    };
    const FindUserName = (e: any) => {
        const nameOnchange = e.target.value;
        const arrayFindName: any = [];
        dataUser?.map((dataUser: any) => {
            if (dataUser.username.toLowerCase().includes(nameOnchange.toLowerCase())) {
                arrayFindName.push(dataUser);
            }
        })
        setFindName(arrayFindName);
    }

    let dataUsers = null;
    if (findName.length > 0) {
        dataUsers = findName?.map(({ _id, username, email, password, imgUrl,phone,address, role }: any) => ({
            _id,
            username,
            email,
            password,
            imgUrl,phone,address,
            role
        }));
        if (getList && getList != "list-0") {
            dataUsers = dataUsers.filter((item: any) => item.role == getList)
        };
    } else {
        dataUsers = dataUser?.map(({ _id, username, email, password, imgUrl,phone,address, role }: any) => ({
            _id,
            username,
            email,
            password,
            imgUrl,phone,address,
            role
        }));
        if (getList && getList != "list-0") {
            dataUsers = dataUsers.filter((item: any) => item.role == getList)
        };
    };
    const handleChange = (value: string) => { setList(value) };
    const selectOptions = [
        { label: 'Lựa chọn', value: 'list-0' },
        { label: 'Nhân viên', value: 'staff' },
        { label: 'Người dùng', value: 'client' },
        { label: 'Quản trị', value: 'admin' },
    ];

    const columns: any = [
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            render: (text: string) => (<a>{text}</a>),
            align: 'center',
        },
        {
            title: 'Hình ảnh',
            dataIndex: "imgUrl",
            key: "imgUrl",
            render: (imgUrl: string) => {
                return <Image className='rounded-lg' width={100} src={imgUrl} />
            },
            align: 'center',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            align: 'center',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            align: 'center',
            key: "address",
            render: (address: string) => {
                return address ? <span>{address}</span> : <span className='text-gray-300'>empty</span>
            }
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            align: 'center',
            render: (phone: string | number) => {
                return phone ? <span>{phone}</span> : <span className='text-gray-300'>empty</span>
            }
        },
        {
            title: 'Chức vụ',
            dataIndex: 'role',
            render: (role: string) => {
                if (role == "admin") {
                    return role == "admin" ? "quản trị" : ""
                } else {
                    return role == "staff" ? "nhân viên" : "khách"
                }
            },
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            render: ({ _id }: any) => (
                <div className="flex space-x-4" style={{ justifyContent: 'center', alignItems: "center" }}>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa không ?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => RemoveUser(_id)}
                        okText={
                            <span style={{ color: 'black' }}>có</span>
                        }
                        cancelText="không"
                    >
                        <DeleteFilled className='scale-125 hover:scale-150 text-red-600' />
                    </Popconfirm>

                    <Link to={`/admin/user/update/${_id}`}>
                        <EditOutlined className='scale-125 hover:scale-150' />
                    </Link>
                </div>
            ),
            align: 'center',
        },
    ];
    return (
        <div>
            <h1 className='ml-5 text-2xl mb-2'>Danh sách các tài khoản</h1><hr />
            {contextHolder}
            <div className='mt-3 flex justify-between'>
                <div className="w-[50%]">
                    <Link to={`/admin/user/add`}><Button className='hover:scale-110 w-[30%]' type="primary" style={{ background: "green", color: "white" }}>
                        Thêm tài khoản
                    </Button></Link>
                    <Input name='nameUser' onChange={() => FindUserName(event)} placeholder="tìm theo tên .." allowClear style={{ width: 350, marginLeft: 50 }} />
                </div>
                <div className="flex space-x-1">
                    <p>Lọc theo: </p>
                    <Select
                        defaultValue="list-0"
                        style={{ width: 170 }}
                        onChange={handleChange}
                        options={selectOptions}
                        className='-mt-[5px]'
                    />
                </div>
            </div>
            <Divider />
            {isLoading ? <Loading /> : <Table columns={columns} dataSource={dataUsers} />}
        </div>
    )
}

export default UserList