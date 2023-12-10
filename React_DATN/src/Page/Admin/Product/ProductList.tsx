import React, { useState } from 'react';
import { Divider, Table, Popconfirm, message, Button, Input, Menu, Dropdown, Modal , Tag} from 'antd';
import { useDeleteProductMutation, useGetAllProductQuery } from '../../../Services/Api_Product';
import { IProduct } from '../../../Models/interfaces';
import { QuestionCircleOutlined, FilterOutlined, ClusterOutlined } from '@ant-design/icons';
import Loading from '../../../Component/Loading';
import { Collapse } from 'antd';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useGetAllCategoryQuery } from '../../../Services/Api_Category';
import { useGetColorsQuery } from '../../../Services/Api_Color';
import { useGetAllSizeQuery } from '../../../Services/Api_Size';


const { Search } = Input;
const { Panel } = Collapse;


// rowSelection object indicates the need for row selection


const ProductList = () => {
  const { data: getAllProduct, isLoading, error } = useGetAllProductQuery()
  const [removeProduct] = useDeleteProductMutation()
  const [messageApi, contextHolder] = message.useMessage()
  const { data: categories } = useGetAllCategoryQuery()
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [isApplyClicked, setIsApplyClicked] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isResetClicked, setIsResetClicked] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<React.Key[]>([])
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  console.log("getAllProduct",getAllProduct);
  

  const rowSelection = {
    selectedRowKeys: selectedProductId,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedProductId(selectedRowKeys)
    },
  };

  // Xóa sản phẩm đã chọn
  const deleteMultipleProducts = async () => {
    try {

      if (selectedProductId.length === 0) {
        message.error("Vui lòng chọn các category muốn xoá!")
        return
      }
      setIsLoadingDelete(true)
      const productIdAll = selectedProductId.map((key) => key.toString());
      await Promise.all(productIdAll.map((productId) => removeProduct(productId)))
      message.success("Xóa thành công")
    } catch (error) {
      message.error("Đã có lỗi xảy ra vui lòng thử lại")
    }
    setIsLoadingDelete(false)
  }

  //data trả về
  const dataSource = getAllProduct?.map(({ _id, name, original_price, price, imgUrl, categoryId, variants,inventoryTotal,sell_quantity }: IProduct) => {
    const colorIds = variants?.map((c) => c.color_id).flat()
    const sizeIds = variants?.map((s) => s.size_id).flat()
    return {
      key: _id,
      name,
      original_price,
      price,
      imgUrl,
      categoryId,
      variants,
      color_id: colorIds,
      size_id: sizeIds,
      inventoryTotal: inventoryTotal,
      sell_quantity: sell_quantity
    }
  })

  // hàm thực hiện đóng và mở chức năng lọc theo giá
  const handleFilterVisibleChange = (visible: any) => {
    setFilterVisible(visible);
  };

  // lọc theo khoảng giá
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsApplyClicked(false);
    setPriceRange((prevState) => ({
      ...prevState,
      min: event.target.value,
    }));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsApplyClicked(false);
    setPriceRange((prevState) => ({
      ...prevState,
      max: event.target.value,
    }));
  };

  const handleApplyClick = () => {
    setIsApplyClicked(true);
    setIsResetClicked(false);
  };

  const handleResetClick = () => {
    setIsResetClicked(true);
    setPriceRange({ min: "", max: "" });
    setIsApplyClicked(false);
  };


  const filterMenu = (
    <Menu>
      <Menu.Item key="1">
        <Input placeholder="Min Price" value={priceRange.min} onChange={handleMinPriceChange} />
      </Menu.Item>
      <Menu.Item key="2">
        <Input placeholder="Max Price" value={priceRange.max} onChange={handleMaxPriceChange} />
      </Menu.Item>
      <div className='d-flex mt-3'>
        <Button danger type="primary" onClick={handleApplyClick} style={{ marginLeft: 12, marginRight: 10 }}>
          Apply
        </Button>
        <Button onClick={() => setFilterVisible(false)}>
          Close
        </Button>
        <Button onClick={handleResetClick} style={{ marginLeft: 12, marginRight: 10 }}>
          Reset
        </Button>
      </div>
    </Menu>
  );

  const getVariant = (record: any) => {
    var variants = record?.variants?.map((variant: any) => {
      console.log("Variant Object:", variant);
      return {
        key: variant._id,
        name: record.name,
        imgUrl: variant.imgUrl[0], // Assuming imgUrl is an array and you want the first element
        size: variant?.size_id?.name,
        color: {
          name: variant.color_id?.name || 'N/A',
          unicode: variant.color_id?.unicode || 'N/A',
        },
        quantity: variant.quantity || 0,
        inventory: variant.inventory || 0
      };
    });
    
    return variants;
  }

  const getCountVariant = (variants : any) => { 
    let count = 0;   
    variants.forEach((item: any) => {      
      count+=item.quantity
    })
   
    return count;
  }

  const columnVariant: any[] = [
    {
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
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
      dataIndex: 'size',
      key: 'size',
      align: 'center',
      render: (size: any) => (
          <span>Size: {size}</span>
      ),
    },
    {
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
      dataIndex: 'inventory',
      key: 'inventory',
      align: 'center',
      render: (inventory: any) => (
        <span>SL: {inventory}</span>
      ),
    },
  ];


  const confirm = (id: number | string) => {

    removeProduct(id).unwrap().then(() => {
      messageApi.open({
        type: "success",
        content: "Xóa sản phẩm thành công"
      })
    })
  }

  //Tìm kiếm theo tên
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredDataSource = searchText ? dataSource?.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  ) : dataSource;

  const filteredAndPricedDataSource = isResetClicked ? filteredDataSource : isApplyClicked ? filteredDataSource?.filter((product) => {
    const { price } = product;
    const { min, max } = priceRange;

    if (min === "" && max === "") return true;
    if (min !== "" && parseInt(min) > price) return false;
    if (max !== "" && parseInt(max) < price) return false;

    return true;
  }) : filteredDataSource;


  const columns: any[] = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (text: string, record: any) => (<a href={`/admin/product/details/${record.key}`}>{text}</a>),
      align: 'center',
    },
    {
      title: 'Hình ảnh',
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (imgUrls: string[]) => (
        imgUrls && imgUrls.length > 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={imgUrls[0]} style={{ width: 100 }} />
          </div>
        ) : null
      ),
      align: 'center',
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryId',
      key: "categoryId",
      render: (categoryId: string) => {
        if (categories) {
          const categoryName = categories.find((c) => c._id === categoryId)
          return categoryName ? categoryName.name : "không xác định"
        }
      },
      align: 'center',
    },

    {
      title: 'Giá hiện tại',
      dataIndex: 'price',
      align: 'center',
      render: (price: number) => (
        <span>{price.toLocaleString('vi-VN', { style: "currency", currency: "VND" })}</span>
      )
    },

    {
      title: 'Giá gốc',
      dataIndex: 'original_price',
      align: 'center',
      render: (original_price: number) => (
        <span>{original_price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
      )
    },

    {
      title: 'Tổng số lượng',
      dataIndex: 'variants',
      align: 'center',
      render: (variants: Object) => (
        <span>{getCountVariant(variants)}</span>
      )
    },
    {
      title: 'Tồn kho',
      dataIndex: 'inventoryTotal',
      align: 'center'
    },

    {
      title: 'Đã bán',
      dataIndex: 'sell_quantity',
      align: 'center'
    },

    {
      title: 'Hành động',
      key: 'action',
      render: ({ key: id }: any) => (
        <div className="flex space-x-4" style={{ justifyContent: 'center', alignItems: "center" }}>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => confirm(id)}
            okText={
              <span style={{ color: 'black' }}>Yes</span>
            }
            cancelText="No"
          >
            <DeleteFilled style={{ color: '#FF0000', fontSize: "20px" }} />
          </Popconfirm>

          <Link to={`/admin/product/${id}/update`}>

            <EditOutlined style={{ fontSize: "20px" }} />
          </Link>

          <Link to={`/admin/product/${id}/variants`}>

            <ClusterOutlined style={{ fontSize: "20px" }} />
          </Link>
        </div>
      ),
      align: 'center',
    },
  ];

  return (
    <div>
      {contextHolder}
      {isLoadingDelete && <Loading />}
      <div>
        <Button
          className='setSize-1'
          style={{ marginRight: 20 }}
          type="primary"
          onClick={deleteMultipleProducts}
          danger
        >
          Xoá mục đã chọn
        </Button>

        <Button className='setSize-1' type="primary" style={{ background: "blue" }}>
          <Link to={`/admin/product/add`}>Thêm mới</Link>
        </Button>
        <Search
          onSearch={handleSearch} placeholder="tìm từ khóa" allowClear style={{ width: 300, marginLeft: 50 }} />
        <Dropdown
          visible={filterVisible}
          onVisibleChange={handleFilterVisibleChange}
          overlay={filterMenu}
          trigger={['click']}
        >
          <Button style={{ marginLeft: 20 }}>
            <FilterOutlined />
          </Button>
        </Dropdown>
      </div>
      <Divider />
      <Table
        rowSelection={{ ...rowSelection, }} columns={columns} dataSource={filteredAndPricedDataSource}
        expandedRowRender={(record) => (
          <div  style={{ marginLeft: 20 }}>
            <p>Danh sách biến thể : <span>{getVariant(record).length}</span></p>
            <Table
              columns={columnVariant}
              dataSource={getVariant(record)}
              pagination={false}
              showHeader={false}
            />
          </div>
        )}
      />
    </div>

  );
};

export default ProductList;