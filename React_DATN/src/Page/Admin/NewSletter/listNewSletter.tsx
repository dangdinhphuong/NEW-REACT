import React, { useState } from "react"
import { Button, Table, Input } from "antd"
import { useGetAllNewSletterQuery } from "../../../Services/Api_newSletter"
import { Link } from "react-router-dom"
import { INewSletter } from "../../../Models/interfaces"
import Loading from "../../../Component/Loading"

const ListNewSletter = () => {
  const { Search } = Input
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedEmailIds, setSelectedEmailIds] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)

  const { data, isLoading, error } = useGetAllNewSletterQuery(undefined)

  if (isLoading) return <Loading />
  if (error) return <div>Error...</div>

  if (!data || !Array.isArray(data)) {
    return <div>No data available.</div>
  }

  const dataSource = data?.map((item: INewSletter, index) => ({
    index: index + 1,
    key: item._id,
    email: item.email,
  }))

  const handleSearch = (value: string) => {
    // Update the search query state when the user types in the search bar
    setSearchQuery(value)
  }

  const filteredData = dataSource.filter((item) =>
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns = [
    {
      title: "#",
      dataIndex: "index",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email: string) => <p style={{}}>{email}</p>,
    },
    {
      title: "Hành Động",
      key: "action",
      render: (action: any) => {
        return (
          <>
            <Link to={`/admin/new-sletter/${action.key}/send`}>
              <Button
              className="setSize-2"
                type="primary"
                style={{ margin: "0 0 0 8px", background: "#1677ff" }}
              >
                Gửi khuyến mãi
              </Button>
            </Link>
          </>
        )
      },
    },
  ]

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedEmailIds(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys: selectedEmailIds,
    onChange: onSelectChange,
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button className="setSize-1" type="primary" loading={loading} danger>
          Gửi hàng loạt
        </Button>
        <Input
          placeholder="Search by email"
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

export default ListNewSletter
