import { useNavigate, useParams, Link } from "react-router-dom"
import { Button, Form, Input, message } from "antd"
import { useGetNewSletterQuery } from "../../../Services/Api_newSletter"
import Loading from "../../../Component/Loading"
import emailjs from "@emailjs/browser"

const EmailSendingForm = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { id } = useParams()
  const { data, isLoading, error } = useGetNewSletterQuery(id)
  const { TextArea } = Input

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  }
  const tailLayout = {
    wrapperCol: { offset: 10, span: 20 },
  }

  const onFinish = (values: any) => {
    console.log(values)
    emailjs.send(
      "service_acqr9th",
      "template_0k1pge9",
      {
        subject: values.subject,
        receiver: values.receiver,
        from_name: "Bee Sneakers",
        message: values.message,
      },
      "0lKVAPFLnrD5iAWzm"
    )
    message.success("Send email success")
  }

  if (isLoading) return <Loading />
  if (error) return <div>Error...</div>

  return (
    <>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        initialValues={{
          ["receiver"]: data.email,
        }}
      >
        <Form.Item
          name="receiver"
          label="Người nhận"
          rules={[
            { required: true, message: "Vui lòng nhập email người nhận " },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          name="subject"
          label="Tiêu đề"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề email!" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          name="message"
          label="Nội dung"
          rules={[{ required: true, message: "Nhập nội dung mail!" }]}
        >
          <TextArea rows={8} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit">Submit</Button>
          <Link to="/admin/new-sletter/list">
            <Button style={{ margin: "0 0 0 8px" }}>Cancel</Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  )
}

export default EmailSendingForm
