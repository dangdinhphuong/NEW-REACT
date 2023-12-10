
import { Form, Button, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../../Component/Loading";
import {  useGetOneCategoryQuery, useUpdateCategoryMutation } from "../../../Services/Api_Category";
import { ICategory } from "../../../Models/interfaces";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const UpdateCategory = () => {
    const [updateCategory] = useUpdateCategoryMutation();
    const navigate = useNavigate();
    const [isLoadingScreen, setIsLoadingScreen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage()
    const { id } = useParams()
    
    
    const { data: categoryData, isLoading } = useGetOneCategoryQuery(id || "")
    
    
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            id: categoryData?._id,
            name: categoryData?.name,
        })
    }, [categoryData])
    // biến bắt buộc phải nhập chữ cái và số
    const alphaNumericRegExp = /^(?![\s])[\p{L}0-9\s]*[\p{L}0-9](?<![\s])$/u;
    const onFinish = (values: ICategory) => {
        
        
        setIsLoadingScreen(true);
        try {
            updateCategory({ ...values, _id: id })
                .unwrap()
                .then(() => {
                    messageApi.open({
                        type: "success",
                        content: "Cập nhật thành công"
                    });
                    setTimeout(() => {
                        window.location.href = 'http://localhost:5173/admin/category/list'
                      }, 2000);
                })
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
        }
        setIsLoadingScreen(false);

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
                <Form.Item name="name" label="Category Mới" rules={[
                    { required: true, message: "Vui lòng nhập Category!" },
                    {
                        pattern: alphaNumericRegExp,
                        message: "Không được để khoảng trống ở đầu và phải có chữ cái và số",
                    }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={() => navigate("/admin/category/list")}>
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>}
        </div>
    );
};

export default UpdateCategory;