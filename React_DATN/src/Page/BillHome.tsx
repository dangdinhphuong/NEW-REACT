import React from 'react';
import { useGetAllOrdersQuery, useGetUserOrdersQuery } from '../Services/Api_Order';
import { Divider, Table } from 'antd';
import Loading from '../Component/Loading';
import { Link } from 'react-router-dom';
import { IOrder } from '../Models/interfaces';
import '../../css/user.css'
import UserMenu from '../Component/UserMenu';

const Bill = () => {
  const { data, isLoading, error } = useGetUserOrdersQuery(undefined);

  const dataSource = data?.map((order: IOrder) => ({
    key: order._id,
    code_order: order?.code_order,
    userId: order?.userId?.username || "",
    createdAt: order?.createdAt,
    status: order?.status,
  }));

  const columns = [
    {
      title: 'Code_order',
      dataIndex: 'code_order',
      key: 'code_order',
    },
    // {
    //   title: 'Address',
    //   render: (record: any) =>
    //     `${record.address.city}, ${record.address.district}, ${record.address.location}`,
    //   key: 'address',
    // },
    {
      title: 'Create by',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => (
        <span style={{ color: getStatusColor(status) }}>
          {getStatusText(status)}
        </span>
      ),
    },
    {
      title: 'Actions',
      render: (record: any) => (
        <Link to={`detail/${record.key}`}>Chi tiết</Link>
      ),
      key: 'actions',
    },
  ];

  const getStatusText = (status: any) => {
    switch (status) {
      case '0':
        return 'Đang chờ xác nhận';
      case '1':
        return 'Đã xác nhận';
      case '2':
        return 'Đã hủy';
      case '3':
        return 'Đang giao hàng';
      case '4':
        return 'Đã nhận hàng';
      default:
        return '';
    }
  };
  const getStatusColor = (status: any) => {
    switch (status) {
      case '0':
        return 'orange';
      case '1':
        return 'green';
      case '2':
        return 'red';
      case '3':
        return 'brown';
      case '4':
        return 'blue';
      default:
        return '';
    }
  };

  return (
    <div className='container_u'>
      <UserMenu />
      <div className='user_profile'>
        <div className="user_profile-head">
          <p>Đơn hàng Của Tôi</p>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      </div>
    </div>
  );
};

export default Bill;