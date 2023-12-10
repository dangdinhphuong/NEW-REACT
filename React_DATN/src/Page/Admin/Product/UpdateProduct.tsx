import { useEffect,useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOneProductQuery, useUpdateProductMutation } from '../../../Services/Api_Product';
import Loading from '../../../Component/Loading';
import { useGetAllCategoryQuery } from '../../../Services/Api_Category';
import { ICategory, IProduct } from '../../../Models/interfaces';

const { Option } = Select;
const { TextArea } = Input

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const UpdateProduct = () => {
    const navigate = useNavigate()
    const [messageApi,contextHolder] = message.useMessage()
    const {data: categoryData} = useGetAllCategoryQuery()
    const {id} = useParams()
    const {data: productData, isLoading} = useGetOneProductQuery(id || "")
    const [updateProduct,{error}] = useUpdateProductMutation()
    const [isLoadingScreen, setIsLoadingScreen] = useState(false);

    useEffect(() => {
      if(error){
        if("data" in error){
          const errDetails = error.data as {message: string}
          messageApi.open({
            type: "error",
            content: errDetails.message
          })
        }
      }
    },[error])

  const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            id: productData?._id,
            name: productData?.name,
            original_price: productData?.original_price,
            price: productData?.price,
            categoryId: (productData?.categoryId as any)?._id,
            quantity: productData?.quantity,
            description: productData?.description
        })
    },[productData])
    

  const onFinish = (values: IProduct) => {
    try {
        setIsLoadingScreen(true)
        updateProduct({...values, _id:id}).unwrap().then(() => {
            messageApi.open({
                type: "success",
                content: "Cập nhật thành công"
            })
            setIsLoadingScreen(false)
            setTimeout(()=> {
                navigate("/admin/product/list")
            },1500)
        })
    } catch (error) {
      message.error("Đã xảy ra lỗi xin vui lòng thử lại sau")
        setIsLoadingScreen(false)
    }
    
  };


  return (

    <div>
        {contextHolder}
        {isLoadingScreen && <Loading />}
        {isLoading ? <Loading /> : <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="name" label="Tên sản phẩm" rules={[
        { required: true, message: "Tên sản phẩm không để trống" },
        {min: 3, message: "Tên sản phẩm tối thiểu 3 ký tự"}
        ]}>
        <Input />
      </Form.Item>
      <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true,message: "Danh mục không để trống"  }]}>
        <Select
          allowClear
          defaultValue={(productData?.categoryId as any)?.name}
        >
           {categoryData && categoryData.length > 0 ? (
        categoryData.map((category: ICategory) => (
          <Option key={category._id} value={category._id}>
            {category.name}
          </Option>
        ))
      ) : (
        <p>Loading...</p>
      )}

        </Select>
      </Form.Item>

      <Form.Item name="original_price" label="Giá gốc" 
        rules={[
          { required: true , message: "Giá không được để trống"},
          {
            validator: (_,values) => {
              if(!isNaN(values)){
                return Promise.resolve()
              }else{
                return Promise.reject(new Error("Giá phải là số"))
              }
            }
          }
        
        ]}>
        <Input />
      </Form.Item>

      <Form.Item name="price" label="Giá hiện tại"  rules={[
          { required: true , message: "Giá hiện tại được để trống"},
          {
            validator: (_,values) => {
              if(!isNaN(values)){
                return Promise.resolve()
              }else{
                return Promise.reject(new Error("Giá phải là số"))
              }
            }
          }
        
        ]}>
        <Input />
      </Form.Item>

      <Form.Item name="quantity" label="Số lượng" 
        rules={[
          { required: true , message: "Số lượng không được để trống"},
          {
            validator: (_,values) => {
              if(!isNaN(values)){
                return Promise.resolve()
              }else{
                return Promise.reject(new Error("Số lượng phải là số"))
              }
            }
          }
        ]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mô tả sản phẩm" name="description">
          <TextArea rows={4} />
        </Form.Item>
   
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" danger style={{marginRight:20}}>
            Cập nhật
        </Button>
        <Button htmlType="button" onClick={() => navigate("/admin/product/list")}>
          Quay lại
        </Button>
      </Form.Item>
    </Form>}
    </div>
    
  );
};

export default UpdateProduct;