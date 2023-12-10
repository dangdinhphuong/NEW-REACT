import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../Component/Loading';
import { IBlog } from '../../../Models/interfaces';
import { useGetOneBlogQuery, useUpdateBlogMutation } from '../../../Services/Api_Blogs';

import ReactQuill from 'react-quill';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const UpdateBlog = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()

    const { id } = useParams()
    const { data: blogData, isLoading } = useGetOneBlogQuery(id || "")
    const [updateBlog] = useUpdateBlogMutation()
    const [isLoadingScreen, setIsLoadingScreen] = useState(false);


    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            id: blogData?._id,
            title: blogData?.title,
            description: blogData?.description,
            author: blogData?.author
        })
    }, [blogData])

    const onFinish = (values: IBlog) => {
        try {
            setIsLoadingScreen(true)
            updateBlog({ ...values, _id: id }).unwrap().then(() => {
                messageApi.open({
                    type: "success",
                    content: "Cập nhật thành công"
                })
                setTimeout(() => {
                    navigate("/admin/blog/list")
                }, 2000)
            })
            setIsLoadingScreen(false)
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Lỗi cập nhật"
            })

            setIsLoadingScreen(false)
        }

    };
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }

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
                <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Bạn chưa nhập tiêu đề' },

                { whitespace: true, message: 'Không được nhập khoảng trắng' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Mô tả chi tiết" rules={[{ required: true, message: 'Bạn chưa nhập mô tả' },
                { whitespace: true, message: 'Không được nhập khoảng trắng' }]}>
                    <ReactQuill theme="snow" modules={modules} className="h-[200px] w-[800px] mb-10" />
                </Form.Item>

                <Form.Item name="author" label="Tác Giả" rules={[{ required: true, message: 'Bạn chưa nhập tác giả' },
                { whitespace: true, message: 'Không được nhập khoảng trắng' }]}>
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button className="bg-blue-500 mr-3" type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={() => navigate("/admin/blog/list")}>
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>}
        </div>

    );
};

export default UpdateBlog;