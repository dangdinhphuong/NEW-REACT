import React, { useState } from "react";
import { Form, Input, Button, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAddCategoryMutation, useGetAllCategoryQuery } from "../../../Services/Api_Category";
import { ICategory } from "../../../Models/interfaces";
import Loading from "../../../Component/Loading";



const AddCategory = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const [isLoadingScreen, setIsLoadingScreen] = useState(false);
    const [addCategory] = useAddCategoryMutation();
    const navigate = useNavigate();
    const { data: allCategories } = useGetAllCategoryQuery();

    const isCategoryNameExists = (name: string) => {
        return Array.isArray(allCategories) && allCategories.some((category: ICategory) => category.name === name);
      };
      
    const onFinish = async (values: ICategory) => {
        try {
            setIsLoadingScreen(true)
            const { name } = values;
            if (isCategoryNameExists(name)) {
                // Nếu tên category đã tồn tại, hiển thị thông báo lỗi
                message.error({
                    content: 'Tên category đã tồn tại. Vui lòng chọn tên khác.',
                });
            } else {
                // Nếu tên category không trùng lặp, thực hiện thêm category
             await addCategory(values)
                    .unwrap()
                    .then(() => {
                        messageApi.open({
                            type: "success",
                            content: "Thêm sản phẩm thành công"
                        })
                        setTimeout(() => {
                            navigate('/admin/category/list')
                        }, 2000);
                    });
            }
        setIsLoadingScreen(false)
        } catch (error) {
            console.error("Thêm Không Thành công", error)
            setIsLoadingScreen(false)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    // biến bắt buộc phải nhập chữ cái và số
    const alphaNumericRegExp = /^(?![\s])[\p{L}0-9\s]*[\p{L}0-9](?<![\s])$/u;
    type FieldType = {
        name: string;
        price: number;
    };
    return (
        <div className="max-w-4xl mx-auto">

            {isLoadingScreen && <Loading />}
                {contextHolder}
            <h2 className="font-bold text-2xl mb-4">Thêm Category</h2>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên Category"
                    name="name"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên Category" },
                        { min: 3, message: "Ít nhất 3 ký tự" },
                        {
                            pattern: alphaNumericRegExp,
                            message: "Không được để khoảng trống ở đầu và phải có chữ cái và số",
                        }
                    ]}
                >
                    <Input />
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" className="setSize-2" htmlType="submit">
                        submit
                    </Button>
                    <Button
                        type="primary"
                        danger
                        className="ml-2"
                        onClick={() => navigate("/admin/category/list")}
                    >
                        Back
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddCategory;