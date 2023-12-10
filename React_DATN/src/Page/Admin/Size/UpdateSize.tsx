
import { Form, Button, Input, message } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneSizeQuery, useUpdateSizeMutation } from "../../../Services/Api_Size";
import { ISize } from "../../../Models/interfaces";
import { useEffect, useState } from "react";
import Loading from "../../../Component/Loading";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const AdminSizeUpdate = () => {
    const [updateSize] = useUpdateSizeMutation();
    const navigate = useNavigate();
    const [isLoadingScreen, setIsLoadingScreen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage()

    const { id } = useParams()
    const { data: sizeData, isLoading } = useGetOneSizeQuery(id || "")
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            id: sizeData?.data?._id,
            name: sizeData?.data?.name,
        })
    }, [sizeData])

    const onFinish = (values: ISize) => {
        try {
            setIsLoadingScreen(true)
            updateSize({ ...values, _id: id }).unwrap().then(() => {
                messageApi.open({
                    type: "success",
                    content: "Cập nhật thành công"
                })
                setTimeout(() => {
                    navigate("/admin/size/list")
                }, 2000)
            })
            setIsLoadingScreen(false)
        } catch (error) {
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
                <Form.Item name="name" label="Size" rules={[
                    { required: true, message: "Vui lòng nhập size!" },
                    { pattern: /^\d{2}$/, message: "Vui lòng nhập số có 2 chữ số!" },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={() => navigate("/admin/size/list")}>
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>}
        </div>
    );
};

export default AdminSizeUpdate;