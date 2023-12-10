import React, { useState } from 'react';
import { Divider, Table, Popconfirm, message, Button, Input } from 'antd';
import { ISize } from '../../../Models/interfaces';
import { QuestionCircleOutlined, DeleteFilled, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDeleteSizeMutation, useGetAllSizeQuery } from '../../../Services/Api_Size';
import Loading from '../../../Component/Loading';


const { Search } = Input;

const SizeList = () => {
  const { data: getAllSize, isLoading } = useGetAllSizeQuery();
  const [removeSize] = useDeleteSizeMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const dataSource = getAllSize?.map(({ _id, name }: ISize) => ({
    key: _id,
    name
  }))

  const [selectedSizes, setSelectedSizes] = useState<any[]>([]);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const confirm = (id: number | string) => {
    removeSize(id)
      .unwrap()
      .then(() => {
        messageApi.open({
          type: 'success',
          content: 'Xóa size thành công'
        });
        setSelectedSizes(prevSelectedSizes =>
          prevSelectedSizes.filter((size: any) => size.key !== id)
        );
      })
      .catch((error) => {
        messageApi.error('Đã xảy ra lỗi khi xóa size');
      });
  };

  const handleSelectionChange = (selectedRowKeys: React.Key[], selectedRows: ISize[]) => {
    setSelectedSizes(selectedRows);
  };

  const deleteSelectedSizes = () => {
    selectedSizes.forEach((size, index) => {
      removeSize(size.key)
        .unwrap()
        .then(() => {
          if (index === selectedSizes.length - 1 && !isDeleteSuccess) {
            messageApi.success('Xóa size thành công');
            setIsDeleteSuccess(true);
          }
        })
        .catch((error) => {
          messageApi.error('Đã xảy ra lỗi khi xóa size');
        });
    });
    setSelectedSizes([]);
  };

  const columns: any = [
    {
      title: 'Size',
      dataIndex: 'name',
      render: (text: string) => (<a>{text}</a>),
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: ({ key: id }: any) => (
        <div className="flex space-x-4" style={{ justifyContent: 'center', alignItems: "center" }}>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => confirm(id)}
            okText={<span style={{ color: 'black' }}>Yes</span>}
            cancelText="No"
          >
            <DeleteFilled style={{ color: '#FF0000', fontSize: "20px" }} />
          </Popconfirm>
          <Link to={`/admin/size/${id}/update`}>
            <EditOutlined style={{ fontSize: "20px" }} />
          </Link>
        </div>
      ),
      align: 'center',
    },
  ];

  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const filteredDataSource = dataSource?.filter((item: any) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      {contextHolder}
      <div>
        <Button
          type="primary"
          className="setSize-1"
          danger
          onClick={deleteSelectedSizes}
          disabled={selectedSizes.length === 0}
        >
          Xóa các size đã chọn
        </Button>
        <Button className="setSize-1" type="primary" style={{ background: "blue", marginLeft: 20 }}>
          <Link to={`/admin/size/add`}>Thêm mới</Link>
        </Button>
        <Search
          placeholder="Tìm từ khóa"
          allowClear
          style={{ width: 300, marginLeft: 50 }}
          onSearch={handleSearch}
        />
      </div>
      <Divider />
      {isLoading ?
        <Loading />
        :
        <Table rowSelection={{
          selectedRowKeys: selectedSizes.map(size => size.key),
          onChange: handleSelectionChange
        }}
          columns={columns}
          dataSource={filteredDataSource}
        />
      }


    </div>
  );
};

export default SizeList;