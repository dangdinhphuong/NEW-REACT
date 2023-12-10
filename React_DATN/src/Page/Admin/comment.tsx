import {
    useDeleteCommentByAdminMutation,
    useGetAllCommentsQuery,
  } from "../../Services/Api_Comment";
  import {
    Table,
    Spin,
    Button,
    Popconfirm,
    message,
    Input,
    InputRef,
  } from "antd";
  import { format } from "date-fns";
  import {
    DeleteFilled,
    QuestionCircleOutlined,
    SearchOutlined,
  } from "@ant-design/icons";
  import { useState, useRef } from "react";
  import Highlighter from "react-highlight-words";
  
  const CommentList = () => {
    const { data: comments, isLoading, refetch } = useGetAllCommentsQuery({});
    const [deleteComment] = useDeleteCommentByAdminMutation();
    const [selectedComments, setSelectedComments] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchProductName, setSearchProductName] = useState("");
    const [searchUserId, setSearchUserId] = useState("");
    const [sortCreatedAt, setSortCreatedAt] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);
    const searchInputRef = useRef<InputRef>(null);
  
    if (isLoading) {
      return <Spin />;
    }
  
    //   hàm lựa chọn comment
    const handleSelect = (commentId: string) => {
      setSelectedComments((prevSelected: any) => {
        if (prevSelected.includes(commentId)) {
          return prevSelected.filter((id: string) => id !== commentId);
        } else {
          return [...prevSelected, commentId];
        }
      });
    };
  
    //   hàm chọn tất cả comment
    const handleSelectAll = () => {
      setSelectedComments((prevSelected) => {
        if (prevSelected.length === comments.length) {
          return [];
        } else {
          return comments.map((comment: any) => comment._id);
        }
      });
    };
  
    //   hàm xóa comment đã chọn
    const handleDeleteSelected = () => {
      selectedComments.forEach((commentId) => {
        deleteComment(commentId)
          .unwrap()
          .then(() => {
            message.success("Xóa thành công bình luận");
            refetch();
          })
          .catch((error) => {
            message.error("Có lỗi xảy ra khi xóa bình luận: " + error.message);
          });
      });
      setSelectedComments([]);
    };
  
    //   hàm xóa từng comment
    const confirmDelete = (commentId: string) => {
      deleteComment(commentId)
        .unwrap()
        .then(() => {
          message.success("Xóa thành công bình luận");
          refetch();
        })
        .catch((error) => {
          message.error("Có lỗi xảy ra khi xóa bình luận: " + error.message);
        });
    };
  
    const handleSearch = (
      selectedKeys: string[],
      confirm: () => void,
      dataIndex: string
    ) => {
      confirm();
      if (dataIndex === "productId") {
        setSearchProductName(selectedKeys[0]);
      } else if (dataIndex === "userId") {
        setSearchUserId(selectedKeys[0]);
      } else {
        setSearchText(selectedKeys[0]);
      }
    };
  
    const handleReset = (
      clearFilters: (params: any) => void,
      setSelectedKeys: (keys: any[]) => void,
      confirm: () => void,
      dataIndex: string
    ) => {
      clearFilters({});
      setSelectedKeys([]);
      if (dataIndex === "productId") {
        setSearchProductName("");
      } else if (dataIndex === "userId") {
        setSearchUserId("");
      } else {
        setSearchText("");
      }
      confirm();
    };
  
    //   hàm sắp xếp theo ngày tạo
    const sorterCreatedAt = (a: any, b: any) => {
      if (a.createdAt && b.createdAt) {
        const timeDiff =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return sortCreatedAt === "createdAt" && sortOrder === "descend"
          ? -timeDiff
          : timeDiff;
      }
      return 0;
    };
  
    const columns = [
      {
        title: (
          <input
            type="checkbox"
            checked={selectedComments.length === comments.length}
            onChange={handleSelectAll}
          />
        ),
        dataIndex: "_id",
        key: "select",
        render: (_id: string) => (
          <input
            type="checkbox"
            checked={selectedComments.includes(_id)}
            onChange={() => handleSelect(_id)}
          />
        ),
      },
      {
        title: "Content",
        dataIndex: "content",
        key: "content",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }: {
          setSelectedKeys: (keys: any[]) => void;
          selectedKeys: any[];
          confirm: () => void;
          clearFilters: () => void;
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Tìm kiếm"
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => handleSearch(selectedKeys, confirm, "content")}
              style={{ width: 188, marginBottom: 8, display: "block" }}
              ref={searchInputRef}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, "content")}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Tìm kiếm
            </Button>
            <Button
              onClick={() =>
                handleReset(clearFilters, setSelectedKeys, confirm, "content")
              }
              size="small"
              style={{ width: 90 }}
            >
              Đặt lại
            </Button>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value: string, record: any) =>
          record.content.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (open: boolean) => {
          if (open) {
            setTimeout(() => searchInputRef.current?.select(), 100);
          }
        },
        render: (text: string) =>
          searchText ? (
            <Highlighter
              highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
      },
      {
        title: "Sản phẩm",
        dataIndex: "productId",
        key: "productId",
        render: (product: any) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {product?.imgUrl[0] && (
              <img
                src={product.imgUrl[0]}
                alt="Product"
                style={{ width: "50px", marginRight: "10px" }}
              />
            )}
            {product?.name ?? "N/A"}
          </div>
        ),
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }: {
          setSelectedKeys: (keys: any[]) => void;
          selectedKeys: any[];
          confirm: () => void;
          clearFilters: () => void;
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Tìm kiếm"
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() =>
                handleSearch(selectedKeys, confirm, "productId")
              }
              style={{ width: 188, marginBottom: 8, display: "block" }}
              ref={searchInputRef}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, "productId")}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Tìm kiếm
            </Button>
            <Button
              onClick={() =>
                handleReset(clearFilters, setSelectedKeys, confirm, "productId")
              }
              size="small"
              style={{ width: 90 }}
            >
              Đặt lại
            </Button>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value: string, record: any) =>
          //   console.log(record),
  
          record.productId?.name.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (open: boolean) => {
          if (open) {
            setTimeout(() => searchInputRef.current?.select(), 100);
          }
        },
      },
      {
        title: "Người dùng",
        dataIndex: "userId",
        key: "userId",
        render: (user: any) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {user?.imgUrl && (
              <img
                src={user.imgUrl}
                alt="Product"
                style={{
                  width: "50px",
                  marginRight: "10px",
                  borderRadius: "999px",
                }}
              />
            )}
            {user?.username ?? "N/A"}
          </div>
        ),
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }: {
          setSelectedKeys: (keys: any[]) => void;
          selectedKeys: any[];
          confirm: () => void;
          clearFilters: () => void;
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Tìm kiếm"
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => handleSearch(selectedKeys, confirm, "userId")}
              style={{ width: 188, marginBottom: 8, display: "block" }}
              ref={searchInputRef}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, "userId")}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Tìm kiếm
            </Button>
            <Button
              onClick={() =>
                handleReset(clearFilters, setSelectedKeys, confirm, "userId")
              }
              size="small"
              style={{ width: 90 }}
            >
              Đặt lại
            </Button>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value: string, record: any) =>
          record.userId.username.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (open: boolean) => {
          if (open) {
            setTimeout(() => searchInputRef.current?.select(), 100);
          }
        },
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (createdAt: Date) =>
          format(new Date(createdAt), "dd/MM/yyyy HH:mm:ss"),
        sorter: sorterCreatedAt,
        sortOrder: sortCreatedAt === "createdAt" ? sortOrder : undefined,
        onHeaderCell: () => ({
          onClick: () => {
            if (sortCreatedAt === "createdAt" && sortOrder === "ascend") {
              setSortOrder("descend");
            } else {
              setSortOrder("ascend");
              setSortCreatedAt("createdAt");
            }
          },
        }),
      },
      {
        title: "Hành động",
        dataIndex: "_id",
        key: "action",
        render: (_id: string) => (
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => confirmDelete(_id)}
            okText={<span style={{ color: "black" }}>Yes</span>}
            cancelText="No"
          >
            <DeleteFilled style={{ color: "#FF0000", fontSize: "20px" }} />
          </Popconfirm>
        ),
      },
    ];
  
    return (
      <div>
        <Button
          style={{ width: "120px", marginBottom: "10px" }}
          type="primary"
          danger
          onClick={handleDeleteSelected}
          disabled={selectedComments.length === 0}
        >
          Xóa đã chọn
        </Button>
        <Table columns={columns} dataSource={comments} rowKey="_id" />
      </div>
    );
  };
  
  export default CommentList;
  