import { Form, Button, Input, message } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAddSizeMutation, useGetAllSizeQuery } from "../../../Services/Api_Size";
import { ISize } from "../../../Models/interfaces";
import Loading from "../../../Component/Loading";
import { useState } from "react";
type FieldType = {
    name: string;
};
const AdminSizeAdd = () => {
    const [addSize, { isLoading }] = useAddSizeMutation();
    const [messageApi, contextHolder] = message.useMessage()
    const [isLoadingScreen, setIsLoadingScreen] = useState(false);
    const navigate = useNavigate();
    const { data: getAllSize } = useGetAllSizeQuery();

    const onFinish = (values: ISize) => {
        try {
            setIsLoadingScreen(true);

            // Kiểm tra size đã tồn tại hay chưa
            const isSizeExisted = getAllSize?.some((size: ISize) => size.name === values.name);

            if (isSizeExisted) {
                messageApi.open({
                    type: "error",
                    content: "Size đã tồn tại",
                });
                setIsLoadingScreen(false);
                return;
            }

            addSize(values)
                .unwrap()
                .then(() => {
                    messageApi.open({
                        type: "success",
                        content: "Thêm thành công",
                    });
                    setTimeout(() => {
                        navigate("/admin/size/list");
                    }, 1000);
                });
            setIsLoadingScreen(false);
        } catch (error) {
            setIsLoadingScreen(false);
        }
    };
    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Thêm Size</h2>
            </header>

            {contextHolder}
            {isLoadingScreen && <Loading />}
            {isLoading ? <Loading /> : <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên size"
                    name="name"
                    rules={[
                        { required: true, message: "Vui lòng nhập size!" },
                        { pattern: /^\d{2}$/, message: "Vui lòng nhập số có 2 chữ số!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button className="setSize-2" type="primary" htmlType="submit">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Thêm"
                        )}
                    </Button>
                    <Button
                        type="primary"
                        danger
                        className="ml-2"
                        onClick={() => navigate("/admin/size/list")}
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>}
        </div>
    );
};

export default AdminSizeAdd;