import React, { useState } from "react"
import { Button, Table, Popconfirm, message, Input } from "antd"

import {
  useRemoveColorMutation,
  useGetColorsQuery,
} from "../../../Services/Api_Color"
import { Link } from "react-router-dom"
import { IColor } from "../../../Models/interfaces"
import Loading from "../../../Component/Loading"

const ListColor = () => {
  const { Search } = Input
  const [searchQuery, setSearchQuery] = useState<string>("")

  const [selectedColorIds, setSelectedColorIds] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)

  const { data, isLoading, error } = useGetColorsQuery(undefined)
  const [removeColor] = useRemoveColorMutation()

  if (isLoading) return <Loading />
  if (error) return <div>Error...</div>

  if (!data || !Array.isArray(data)) {
    return (
      <div>
        No data available.
        <Link to={`/admin/color/create`}>
          <Button style={{ margin: "0 0 0 8px" }}>Tạo Màu Mới</Button>
        </Link>
      </div>
    )
  }

  const dataSource = data?.map((item: IColor, index) => ({
    index: index + 1,
    key: item._id,
    name: item.name,
    unicode: item.unicode,
  }))

  const handleSearch = (value: string) => {
    // Update the search query state when the user types in the search bar
    setSearchQuery(value)
  }

  const filteredData = dataSource.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns = [
    {
      title: "#",
      dataIndex: "index",
    },
    {
      title: "Màu",
      dataIndex: "name",
      render: (text: string) => <p style={{}}>{text}</p>,
    },
    {
      title: "Unicode",
      dataIndex: "unicode",
      render: (unicode: string) => (
        <p
          style={{
            background: unicode,
            width: "25px",
            height: "25px",
            borderRadius: "50%",
          }}
        ></p>
      ),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (color: any) => {
        return (
          <>
            <Popconfirm
              title="Xoá màu"
              description="Bạn có chắc muốn xoá màu này không?"
              onConfirm={() => {
                removeColor(color.key)
                message.error("Remove success")
              }}
              okText={<span style={{ color: "black" }}>Yes</span>}
              cancelText="No"
            >
              <Button danger>Xoá</Button>
            </Popconfirm>
            <Link to={`/admin/color/${color.key}/update`}>
              <Button type="dashed" style={{ margin: "0 0 0 8px" }}>
                Cập Nhật
              </Button>
            </Link>
          </>
        )
      },
    },
  ]
  /**
   *
   * *! Initialize the function to delete multiple Colors
   */
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedColorIds(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys: selectedColorIds,
    onChange: onSelectChange,
  }

  const handleBatchDelete = () => {
    if (selectedColorIds.length === 0) {
      message.warning("Vui lòng chọn các màu muốn xoá!")
      return
    }

    setLoading(true)

    Promise.all(selectedColorIds.map((colorId) => removeColor(colorId)))
      .then(() => {
        message.success("Colors successfully deleted.")
        setSelectedColorIds([])
      })
      .catch(() => {
        message.error("Failed to delete colors. Please try again.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          className="setSize-1"
          onClick={handleBatchDelete}
          loading={loading}
          danger
        >
          Xoá Nhiều Màu
        </Button>
        <Link to={`/admin/color/create`}>
          <Button className="setSize-1" style={{ margin: "0 0 0 8px" }}>Tạo Màu Mới</Button>
        </Link>
        <Input
          placeholder="Search by color name"
          onChange={(e) => handleSearch(e.target.value)} // Use the onChange event to trigger real-time filtering
          style={{ width: 280, marginLeft: 8 }}
        />
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData}
        tableLayout="fixed"
      />
    </div>
  )
}

export default ListColor
