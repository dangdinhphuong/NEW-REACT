import React from 'react';
import { Table, Tag ,Button , Popconfirm , message} from 'antd';
import { useGetOneProductQuery , useDeleteVariantMutation } from '../../../Services/Api_Product';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined, DeleteFilled} from '@ant-design/icons';

const ProductListDetails = () => {
  const [removeVariant] = useDeleteVariantMutation()
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage()
  const { data: productDataOne, isLoading: isLoadingProduct }: any = useGetOneProductQuery(id || "");
  const flattenedData = productDataOne?.variants?.map((variant:any) => {
    console.log("Variant Object:", variant);
    return {
      key: variant._id,
      name: productDataOne.name,
      imgUrl: variant.imgUrl[0], // Assuming imgUrl is an array and you want the first element
      size: variant?.size_id?.name,
      color: {
        name: variant.color_id?.name || 'N/A',
        unicode: variant.color_id?.unicode || 'N/A',
      },
      quantity: variant.quantity || 0,
      sell_quantity: variant.sell_quantity || 0,
      inventory: variant.inventory || 0,
    };
  });

  const confirm = (index: number) => {    
    let body = {
      productId: id ,
      variantId: index
    }
    
    removeVariant(body).unwrap().then(() => {
      messageApi.open({
        type: "success",
        content: "Xóa sản phẩm thành công"
      })
    })
  }
  
  // Define columns for the product details
  const columns: any[] = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Hình ảnh',
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (imgUrl: string) => (
        imgUrl ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={imgUrl} style={{ width: 100 }} alt="Product" />
          </div>
        ) : null
      ),
      align: 'center',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      align: 'center',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      align: 'center',
      
      render: (color: { name: string, unicode: string }) => (
        <span>
          {color ? (
            <Tag color={color.unicode} key={color.unicode}>
              {color.name}
            </Tag>
          ) : "Không xác định"}
        </span>
      ),
    },
    {
      title: 'Nhập hàng',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
    },
    {
      title: 'Đã bán',
      dataIndex: 'sell_quantity',
      key: 'sell_quantity',
      align: 'center',
    },
    {
      title: 'Còn lại',
      dataIndex: 'inventory',
      key: 'inventory',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any, index: number) => (
        <div className="flex space-x-4" style={{ justifyContent: 'center', alignItems: "center" }}>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => confirm(index)}
            okText={
              <span style={{ color: 'black' }}>Yes</span>
            }
            cancelText="No"
          >
            <DeleteFilled style={{ color: '#FF0000', fontSize: "20px" }} />
          </Popconfirm>
        </div>
      ),
      align: 'center',
    },
  ];

  return (
    <div>
      {isLoadingProduct ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Button className='setSize-1' type="primary" style={{ background: "blue" }}>
             <Link to={"/admin/product/" + id + "/variants"}>Thêm mới</Link>
          </Button>
          <Table
            style={{ marginTop: 30}}
            columns={columns}
            dataSource={flattenedData} 
            pagination={false}
          />
        </div>
      )}
    </div>
  );
};

export default ProductListDetails;
