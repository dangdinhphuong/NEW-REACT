import React, { useState } from 'react';
import { Divider, Table, Popconfirm, message, Button, Input, Menu, Dropdown } from 'antd';
import { useGetAllDeletedProductsQuery, useRemoveProductMutation, useRestoreProductMutation } from '../../../Services/Api_Product';
import { IProduct } from '../../../Models/interfaces';
import { QuestionCircleOutlined, FilterOutlined,ReloadOutlined } from '@ant-design/icons';
import Loading from '../../../Component/Loading';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { useGetAllCategoryQuery } from '../../../Services/Api_Category';
import { useGetColorsQuery } from '../../../Services/Api_Color';
import { useGetAllSizeQuery } from '../../../Services/Api_Size';
import { useNavigate } from 'react-router';


const { Search } = Input;


// rowSelection object indicates the need for row selection


const GetAllDeletedProducts = () => {
  const [removeProduct] = useRemoveProductMutation()
  const [messageApi, contextHolder] = message.useMessage()
  const { data: categories } = useGetAllCategoryQuery()
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [isApplyClicked, setIsApplyClicked] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isResetClicked, setIsResetClicked] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<React.Key[]>([])
  const { data:getAllColor } = useGetColorsQuery()
  const {data: getAllSize} = useGetAllSizeQuery()
  const {data: getAllDeletedProducts,isLoading} = useGetAllDeletedProductsQuery()
  const [restore] = useRestoreProductMutation()
  const [isLoadingScreen,setIsLoadingScreen] = useState(false)

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
        message.error("Vui lòng chọn sản phẩm muốn xoá!")
        return
      }

      setIsLoadingScreen(true)
      const productIdAll = selectedProductId.map((key) => key.toString());
      await Promise.all(productIdAll.map((productId) => removeProduct(productId)))
      message.success("Xóa thành công")
      setIsLoadingScreen(false)

    } catch (error) {
      message.error("Đã có lỗi xảy ra vui lòng thử lại")
      setIsLoadingScreen(false)
    }
  }

  const restoreMultipleProducts = async () => {
    try {
      
      if (selectedProductId.length === 0) {
        message.error("Vui lòng chọn sản phẩm muốn khôi phục")
        return
      }

      setIsLoadingScreen(true)
      const productIdAll = selectedProductId.map((key) => key.toString());
      await Promise.all(productIdAll.map((productId) => restore(productId)))
      message.success("Khôi phục sản phẩm thành công")
      setIsLoadingScreen(false)
      
    } catch (error) {
      message.error("Đã có lỗi xảy ra vui lòng thử lại")
      setIsLoadingScreen(false)
    }
  }

  //data trả về
  const dataSource = getAllDeletedProducts?.map(({ _id, name, original_price, price, imgUrl, categoryId,color_id,size_id }: IProduct) => ({
    key: _id,
    name,
    original_price,
    price,
    imgUrl,
    categoryId,
    color_id,
    size_id
  }))

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


  // thực hiện xóa sản phẩm vĩnh viễn
  const confirm = (id: number | string) => {
    setIsLoadingScreen(true)
    removeProduct(id).unwrap().then(() => {
      messageApi.open({
        type: "success",
        content: "Xóa sản phẩm thành công"
      })
    })
    setIsLoadingScreen(false)
  }

  // Thực hiện khôi phục sản phẩm
  const restoreProduct = async (id: number | string) => {
    try {
      setIsLoadingScreen(true)
     await restore(id)
     messageApi.open({
      type: "success",
      content: "Khôi phục sản phẩm thành công"
     })
      setIsLoadingScreen(false)
    } catch (error) {
      message.error("Đã có lỗi xảy ra vui lòng thử lại sau")
    }
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
      render: (text: string) => (<a>{text}</a>),
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
      title: 'Màu xắc',
      dataIndex: 'color_id',
      key: 'color_id',
      render: (colorIds: string[]) => {
        if (getAllColor) {       
          const colorElements = colorIds?.map(colorId => {
            const color = getAllColor.find(c => c._id === colorId);
            return color ? (
              <span
                key={color._id}
                style={{
                  background: color.unicode,
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  marginRight:5
                }}
              ></span>
            ) : null;
          });
          return (
            <div style={{ display: 'flex',justifyContent: "center",alignItems: "center" }}>
              {colorElements}
            </div>
          );
        }
        return "Không xác định";
      },
      align: 'center',
    },
    
    {
      title: 'Kích thước',
      dataIndex: 'size_id',
      key: 'size_id',
      render: (sizeIds: string[]) => {
       if(getAllSize){
          const sizeElements = sizeIds.map(sizeID => {
            const size = getAllSize.find(s => s._id === sizeID)
            return size ? size.name : ""
          })
          if(sizeElements){
            return sizeElements.join(", ")
          }    
      }
        return "Không xác định"
      },
      align: 'center',
    },
    
    {
      title: 'Giá hiện tại',
      dataIndex: 'price',
      align: 'center',
      render: (price: number) => (
        <span>{price.toLocaleString('vi-VN',{style: "currency", currency: "VND"})}</span>
      )
    },
    
    {
      title: 'Giá gốc',
      dataIndex: 'original_price',
      align: 'center',
      render: (original_price: number) => (
        <span>{original_price.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</span>
      )
    },

    {
      title: 'Action',
      key: 'action',
      render: ({ key: id }: any) => (
        <div className="flex space-x-4" style={{ justifyContent: 'center', alignItems: "center" }}>
          <Popconfirm
            title="Bạn có muốn khôi phục sản phẩm không?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => restoreProduct(id)}
            okText={
              <span style={{ color: 'black' }}>Yes</span>
            }
            cancelText="No"
          >
            <ReloadOutlined style={{ color: 'black', fontSize: "20px" }} />
          </Popconfirm>
          
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm không?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => confirm(id)}
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
      {contextHolder}
      {isLoadingScreen && <Loading />}
      <div>
        <Button
         className='setSize-1'
          type="primary"
          onClick={deleteMultipleProducts}
          danger
          style={{marginRight: 15}}
        >
          Xoá mục đã chọn
        </Button>

        <Button
        className='w-[20%]'
          onClick={restoreMultipleProducts}
        >
          Khôi phục sản phẩm đã chọn
        </Button>

        <Search
          onSearch={handleSearch} placeholder="tìm từ khóa" allowClear style={{ width: 300, marginLeft: 20 }} />

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
      {isLoading ? <Loading /> : <Table rowSelection={{ ...rowSelection, }} columns={columns} dataSource={filteredAndPricedDataSource} />}

    </div>
  );
};

export default GetAllDeletedProducts;