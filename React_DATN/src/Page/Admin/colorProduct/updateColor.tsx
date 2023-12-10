import { useNavigate, useParams, Link } from "react-router-dom"
import { Button, Form, Input, message } from "antd"
import { ColorPicker } from "antd"
import { useState } from "react"
import {
  useGetOneColorQuery,
  useUpdateColorMutation,
} from "../../../Services/Api_Color"
import Loading from "../../../Component/Loading"

const UpdateColor = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading, error } = useGetOneColorQuery(id)
  const [updateProduct] = useUpdateColorMutation()

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  }
  const tailLayout = {
    wrapperCol: { offset: 10, span: 20 },
  }
  const [colorCode, setColorCode] = useState("")

  const handleColorChange = (color: any) => {
    setColorCode(color.toHexString())
  }

  const onFinish = (values: any) => {
    const updatedValues = {
      ...values,
      unicode: colorCode,
      _id: id,
    }

    updateProduct(updatedValues)
    message.success("Update product success")
    navigate("/admin/color/list")
  }
  //-------------------------------------------------------------
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
          ["name"]: data.data.name,
          ["unicode"]: data.data.unicode,
        }}
      >
        <Form.Item
          name="name"
          label="Tên Màu"
          rules={[{ required: true, message: "Vui lòng nhập tên màu!" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item name="unicode" label="Mã Màu">
          <ColorPicker
            presets={[
              {
                label: "Recommended",
                colors: [
                  "#000000",
                  "#000000E0",
                  "#000000A6",
                  "#00000073",
                  "#00000040",
                  "#00000026",
                  "#0000001A",
                  "#00000012",
                  "#0000000A",
                  "#00000005",
                  "#F5222D",
                  "#FA8C16",
                  "#FADB14",
                  "#8BBB11",
                  "#52C41A",
                  "#13A8A8",
                  "#1677FF",
                  "#2F54EB",
                  "#722ED1",
                  "#EB2F96",
                  "#F5222D4D",
                  "#FA8C164D",
                  "#FADB144D",
                  "#8BBB114D",
                  "#52C41A4D",
                  "#13A8A84D",
                  "#1677FF4D",
                  "#2F54EB4D",
                  "#722ED14D",
                  "#EB2F964D",
                ],
              },
            ]}
            defaultValue={data.data.unicode}
            onChange={handleColorChange}
            showText
          />
          <input
            type="hidden"
            value={colorCode}
            onChange={(e) => setColorCode(e.target.value)}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit">Submit</Button>
          <Link to="/admin/color/list">
            <Button style={{ margin: "0 0 0 8px" }}>Cancel</Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  )
}

export default UpdateColor
