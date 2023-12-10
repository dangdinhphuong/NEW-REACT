import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { Button, Form, Input, message, Select } from "antd"
import {
  useGetOneDiscountQuery,
  useUpdateDiscountMutation,
} from "../../../Services/Api_Discount"
import Loading from "../../../Component/Loading"
import moment from "moment"

const UpdateDiscount = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading, error } = useGetOneDiscountQuery(id)
  const [updateDiscount] = useUpdateDiscountMutation()

  // Sử dụng state để xác định trường nào đang được sử dụng
  const [discountType, setDiscountType] = useState<string | null>(null)

  // Thiết lập giá trị cho discountType khi component được render
  useEffect(() => {
    if (data && data.data) {
      const { percentage, amountDiscount } = data.data

      if (percentage !== undefined && percentage !== null && percentage !== 0) {
        setDiscountType("percentage")
      } else if (
        amountDiscount !== undefined &&
        amountDiscount !== null &&
        amountDiscount !== 0
      ) {
        setDiscountType("amount")
      }
    }
  }, [data])

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  }
  const tailLayout = {
    wrapperCol: { offset: 10, span: 20 },
  }

  const onFinish = (values: any) => {
    const updatedValues = {
      ...values,
      _id: id,
      percentage: discountType === "percentage" ? values.percentage : 0,
      amountDiscount: discountType === "amount" ? values.amountDiscount : 0,
    }
    updateDiscount(updatedValues)
    message.success("Cập nhật mã giảm giá thành công")
    navigate("/admin/discount/list")
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
          ["code"]: data.data.code,
          ["percentage"]: data.data.percentage,
          ["amountDiscount"]: data.data.amountDiscount,
          ["minimumOrderAmount"]: data.data.minimumOrderAmount,
          ["quantity"]: data.data.quantity,
          ["startDate"]: moment(data.data.startDate).format("YYYY-MM-DD HH:mm"),
          ["expiresAt"]: moment(data.data.expiresAt).format("YYYY-MM-DD HH:mm"),
        }}
      >
        <Form.Item
          name="code"
          label="Mã Giảm Giá"
          rules={[{ required: true, message: "Vui lòng nhập mã giảm giá!" }]}
        >
          <Input type="text" />
        </Form.Item>
        {/* <Form.Item
          name="percentage"
          label="Phần Trăm Giảm Giá"
          rules={[
            { required: true, message: "Vui lòng nhập phần trăm giảm giá!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="amountDiscount"
          label="Số tiền giảm giá"
          rules={[
            { required: true, message: "Vui lòng nhập số tiền giảm giá!" },
          ]}
        >
          <Input type="number" />
        </Form.Item> */}

        <Form.Item name="discountType" label="Loại Giảm Giá">
          <Select onChange={(value) => setDiscountType(value)}>
            <Select.Option value="percentage">Phần Trăm</Select.Option>
            <Select.Option value="amount">Số Tiền</Select.Option>
          </Select>
        </Form.Item>
        {discountType === "percentage" && (
          <Form.Item
            name="percentage"
            label="Phần Trăm Giảm Giá"
            rules={[
              { required: true, message: "Vui lòng nhập phần trăm giảm giá!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        )}
        {discountType === "amount" && (
          <Form.Item
            name="amountDiscount"
            label="Số tiền giảm giá"
            rules={[
              { required: true, message: "Vui lòng nhập số tiền giảm giá!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        )}

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
              message: "Vui lòng nhập thời gian bắt đầu áp dụng mã!",
            },
          ]}
        >
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item
          name="expiresAt"
          label="Thời hạn sử dụng"
          rules={[
            { required: true, message: "Vui lòng nhập thời hạn mã giảm giá!" },
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

export default UpdateDiscount
