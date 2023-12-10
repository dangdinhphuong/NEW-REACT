import { Link, useNavigate } from "react-router-dom"
import { Button, Form, Input, message, Select } from "antd"
import { useCreateDiscountMutation } from "../../../Services/Api_Discount"

const CreateDiscount = () => {
  const navigate = useNavigate()
  const [createDiscount] = useCreateDiscountMutation()
  const [form] = Form.useForm()

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  }
  const tailLayout = {
    wrapperCol: { offset: 10, span: 20 },
  }

  const onFinish = (values: any) => {
    let percentage = 0
    let amountDiscount = 0
    if (values.discountType === "percentage") {
      percentage = values.discountValue
      amountDiscount = 0
    } else if (values.discountType === "amount") {
      percentage = 0
      amountDiscount = values.discountValue
    }

    const discountData = {
      code: values.code,
      percentage: percentage,
      amountDiscount: amountDiscount,
      minimumOrderAmount: values.minimumOrderAmount,
      quantity: values.quantity,
      startDate: values.startDate,
      expiresAt: values.expiresAt,
    }
    console.log(discountData)
    createDiscount(discountData)
    message.success("Tạo mã giảm giá thành công")
    navigate("/admin/discount/list")
  }
  //----------------------------------------------------------
  //   if (isLoading) return <div>Loading...</div>
  return (
    <>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="code"
          label="Mã Giảm Giá"
          rules={[
            { required: true, message: "Vui lòng nhập mã giảm giá!" },
            { min: 6, message: "Mã giảm giá cần ít nhất 6 kí tự!" },
          ]}
        >
          <Input type="text" />
        </Form.Item>

        {/* Kiểu mã giảm giá */}
        <Form.Item
          name="discountType"
          label="Loại Giảm Giá"
          rules={[{ required: true, message: "Vui lòng chọn loại giảm giá!" }]}
        >
          <Select>
            <Select.Option value="percentage">Phần Trăm</Select.Option>
            <Select.Option value="amount">Số Tiền</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="discountValue"
          label="Giảm Giá"
          rules={[{ required: true, message: "Vui lòng nhập giảm giá!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="minimumOrderAmount"
          label="Giá trị tối thiểu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá trị tối thiểu áp dụng mã!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[{ required: true, message: "Vui lòng nhập số lượng mã!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Ngày bắt đầu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ngày áp dụng mã giảm giá!",
            },
          ]}
        >
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item
          name="expiresAt"
          label="Ngày hết hạn"
          rules={[
            { required: true, message: "Vui lòng nhập ngày hết hạn mã!" },
          ]}
        >
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit">Submit</Button>
          <Link to="/admin/discount/list">
            <Button style={{ margin: "0 0 0 8px" }}>Cancel</Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateDiscount
