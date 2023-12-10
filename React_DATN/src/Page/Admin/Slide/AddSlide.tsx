import React, { useState } from 'react'
import { Button, message, Form, Input, Modal, Mentions, Upload } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import type { UploadFile } from "antd/es/upload/interface"
import type { RcFile, UploadProps } from "antd/es/upload"
import { PlusOutlined } from "@ant-design/icons"
import axios from "axios"
import { useAddSlideMutation } from '../../../Services/Api_Slide';
import Loading from '../../../Component/Loading';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AddSlide = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [fileList, setFileList]: any = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [addSlide]: any = useAddSlideMutation();
  const [loading, setLoading]: any = useState(false);


  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  const handleCancel = () => setPreviewOpen(false);

  const handleChange: UploadProps['onChange'] = ({ fileList }) =>
    setFileList(fileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      values.titleSlider.trim();
      values.titleSlider.trim();
      // if (!isNaN(values.titleSlider) && /[a-zA-Z]/.test(values.titleSlider) == false) { messageApi.open({ type: "error", content: "Hãy nhập tên tiêu đề và tiêu đề phải có ít nhất 1 chữ cái !" }); setLoading(false); return }
      if (!isNaN(values.contentSlider) && /[a-zA-Z]/.test(values.contentSlider) == false) { messageApi.open({ type: "error", content: "Hãy nhập nội dung tiêu đề và nội dung phải có ít nhất 1 chữ cái !" }); setLoading(false); return }
      if (!fileList[0]) { messageApi.open({ type: "error", content: "Hãy chọn ảnh cho slide !" }); setLoading(false); return }

      const formData = new FormData();
      formData.append("images", fileList[0].originFileObj);

      if (fileList[0].originFileObj) {
        const response = await axios.post(
          "http://localhost:8080/api/images/upload",
          formData
        );


        if (response.status == 200) {
          const newdataSlide: any = {
            titleSlider: values.titleSlider,
            contentSlider: values.contentSlider,
            imgSlider: response.data.urls[0].url,
          };
          console.log("result - getImage: ", newdataSlide);
          addSlide(newdataSlide);
          messageApi.open({
            type: "success",
            content: "Thêm slide thành công, chuẩn bị quay lại trong giây lát.",
          });
          setLoading(false);
          setTimeout(() => {
            navigate("/admin/slide/list");
          }, 1500);
        };
      };
    } catch (err) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "Ảnh không tương thích để thêm, hãy chọn ảnh khác !.",
      });
    };
  };


  return (
    <div>
      {contextHolder}
      <h1 className='text-center text-2xl mb-2'>Thêm slide mới</h1><hr />
      <p className='text-gray-400'>(!) có thể để dấu cách khi không muốn dùng tiêu đề.</p>
      {loading && <Loading />}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: "auto", margin: "0 auto" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="flex space-x-5 ">
          <div className="">
            <Form.Item
              style={{ width: 700 }}
              label="Tiêu đề"
              name="titleSlider"
              rules={[{ required: true, message: 'Bắt buộc nhập tiêu đề !' }]}
            >
              <Input placeholder="Tên tiêu đề" />
            </Form.Item>

            <Form.Item
              name="contentSlider"
              label="Nội dung"
              rules={[{ required: true }]}
            >
              <Mentions
                rows={3}
                placeholder="Viết nội dung cho slide.."
              />
            </Form.Item>
          </div>
          <div className="">
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length < 1 ? uploadButton : null}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <p className='text-xs text-red-500'>(*) lưu ý một số ảnh không thể tải lên, ưu tiên dùng (.png, .jpg, .jpeg)</p>
          </div>
        </div>



        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className='w-28' style={{ backgroundColor: "green", color: "white" }} htmlType="submit">
            Thêm mới
          </Button>
          <Link to={`/admin/slide/list`}>
            <Button style={{ backgroundColor: "gray", color: "white" }} htmlType="submit">
              Quay lại
            </Button>
          </Link>
        </Form.Item>
      </Form>

    </div>
  )
}

export default AddSlide
