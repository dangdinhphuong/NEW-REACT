import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import Loading from "../../../Component/Loading";
import { IBlog } from "../../../Models/interfaces";
import { useAddBlogMutation } from "../../../Services/Api_Blogs";
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

type urlObject = {
    url: string;
};

const AddBlog = () => {

    const navigate = useNavigate()
    const [addBlog] = useAddBlogMutation();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [isLoadingScreen, setIsLoadingScreen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();


    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
        );
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const beforeUpload = (file: RcFile): boolean => {
        return false;
    };

    const onFinish = async (values: IBlog) => {
        try {
            setIsLoadingScreen(true);
            const formData = new FormData();
            fileList.map((file) => {
                if (file.originFileObj) {
                    formData.append("images", file.originFileObj)
                }
            });

            const response = await axios.post(
                "http://localhost:8080/api/images/upload",
                formData
            )
            console.log("result-images: ", response);

            const imageUrls = response.data.urls.map((urls: urlObject) => urls.url);

            if (response.status === 200) {
                const newBlog: IBlog = {
                    title: values.title,
                    imgUrl: imageUrls,
                    description: values.description,
                    author: values.author
                };

                addBlog(newBlog).unwrap().then(() => {
                    messageApi.open({
                        type: "success",
                        content: "Thêm sản phẩm thành công,đang quay về trang quản trị"
                    })
                    setTimeout(() => {
                        navigate("/admin/blog/list")
                    }, 2000)
                });
            }
            setIsLoadingScreen(false);


        } catch (error) {
            setIsLoadingScreen(false);
            messageApi.open({
                type: "error",
                content: "Ảnh không tương thích để thêm, hãy chọn ảnh khác !.",
            });
        };
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
            matchVisual: false,
        },
    }


    return (
        <div>
            {contextHolder}
            {isLoadingScreen && <Loading />}
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                name="control-ref"
                onFinish={onFinish}
                style={{ maxWidth: 800, margin: '0 auto' }}
            >
                <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Bạn chưa nhập tiêu đề' },
                { whitespace: true, message: 'Không được để trống tiêu đề' }]}>
                    <Input />
                </Form.Item>

                <Form.Item>

                    <Upload
                        listType="picture-card"
                        name="images"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        multiple
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <p className='text-xs text-red-500'>(*) lưu ý một số ảnh không thể tải lên, ưu tiên dùng (.png, .jpg, .jpeg)</p>
                </Form.Item>
                <Form.Item name="description" label="Mô tả chi tiết" rules={[{ required: true, message: 'Bạn chưa nhập mô tả' },
                { whitespace: true, message: 'Không được để trống mô tả' }]}>

                    <ReactQuill theme="snow" modules={modules} className="h-[200px] w-[800px] mb-10" />




                </Form.Item>
                <Form.Item name="author" label="Tác giả" rules={[{ required: true, message: 'Bạn chưa nhập tác giả' },
                { whitespace: true, message: 'Không được để trống ' }]}>
                    <Input />
                </Form.Item>
                <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>

                <Form.Item>
                    <Button className="setSize-2 mr-2" type="primary" htmlType="submit">
                        Thêm mới
                    </Button>
                    <Button htmlType="button" onClick={() => navigate("/admin/blogs/list")}>Quay lại</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddBlog;
