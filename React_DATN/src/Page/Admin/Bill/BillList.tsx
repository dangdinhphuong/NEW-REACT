import React, { useState } from 'react';
import { Divider, Select, Table } from 'antd';
import { useGetAllOrdersQuery, useUpdateOrderMutation } from '../../../Services/Api_Order';
import { IOrder } from '../../../Models/interfaces';
import Loading from '../../../Component/Loading';
import { Link } from 'react-router-dom';
import { Option } from 'antd/es/mentions';

const BillList = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery(undefined);

  const [filterStatus, setFilterStatus] = useState('');

  const dataSource = data?.map((order: IOrder) => ({
    key: order._id,
    code_order: order?.code_order,
    userId: order?.userId?.username || "",
    createdAt: order?.createdAt,
    status: order?.status,
  }));

  const [updateOrder] = useUpdateOrderMutation();

  const handleStatusChange = (value: string, orderId: string) => {
    updateOrder({ _id: orderId, status: value }).unwrap().then(() => {
      console.log("Trạng thái đã được cập nhật thành công.");
    }).catch((error) => {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    });
  };

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
      render: (status: any, record: IOrder) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(value, record.key)}
          style={{ width: 150 }}
        >
          <Option value="0">Đang chờ xác nhận</Option>
          <Option value="1">Đã xác nhận</Option>
          <Option value="2">Đã hủy</Option>
          <Option value="3">Đang giao hàng</Option>
          <Option value="4">Đã nhận hàng</Option>
        </Select>
      ),
    },
    {
      title: 'Actions',
      render: (record: any) => (
        <Link to={`/admin/bill/detail/${record.key}`}>Chi tiết</Link>
      ),
      key: 'actions',
    },
  ];

  const handleStatusFilter = (value: string) => {
    setFilterStatus(value);
  };

  const filteredData = filterStatus ? dataSource?.filter((order: IOrder) => order.status === filterStatus) : dataSource;

  return (
    <div>
      <Divider />

      <div style={{ marginBottom: '16px' }}>
        <span style={{ marginRight: '8px' }}>Lọc theo trạng thái:</span>
        <Select
          value={filterStatus}
          onChange={handleStatusFilter}
          style={{ width: 150 }}
        >
          <Option value="">Tất cả</Option>
          <Option value="0">Đang chờ xác nhận</Option>
          <Option value="1">Đã xác nhận</Option>
          <Option value="2">Đã hủy</Option>
          <Option value="3">Đang giao hàng</Option>
          <Option value="4">Đã nhận hàng</Option>
        </Select>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Table columns={columns} dataSource={filteredData} />
        </>
      )}
    </div>
  );
};

export default BillList;