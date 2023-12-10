import React from 'react';
import { useGetOneOrdersQuery, useUpdateOrderMutation } from '../Services/Api_Order';
import { Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { IOrder } from '../Models/interfaces';
import '../../css/user.css'
import UserMenu from '../Component/UserMenu';

const BillDetailHome = () => {
    const navigate = useNavigate()

    const { id } = useParams();
    const { data } = useGetOneOrdersQuery(id || "");
    console.log("dtaa", data)

    const [updateOrder] = useUpdateOrderMutation();
    const [messageApi, contextHolder] = message.useMessage()

    const onFinish = (values: IOrder) => {
        console.log("a", values);

        try {
            updateOrder({ ...values, _id: id }).unwrap().then(() => {
                messageApi.open({
                    type: "success",
                    content: "Hủy thành công"
                });
                setTimeout(() => {
                    window.location.href = 'http://localhost:5173/order/view';
                }, 2000);
            })
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
        }
    };

    const getStatusText = (status: any) => {
        switch (status) {
            case '0':
                return 'Đang chờ xác nhận';
            case '1':
                return 'Đã xác nhận';
            case '2':
                return 'Đã hủy';
            default:
                return '';
        }
    };
    const getStatusColor = (status: any) => {
        switch (status) {
            case '0':
                return { color: 'orange' };
            case '1':
                return { color: 'green' };
            case '2':
                return { color: 'red' };
            default:
                return {};
        }
    };

    return (
        <div className='container_u'>
            {contextHolder}
            <UserMenu />
            <div className='user_profile'>
                <div className="user_profile-head">
                    <p>Đơn hàng Của Tôi</p>
                </div>
                <div>
                    {data && (
                        <div className='order' style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                            <div style={{ marginRight: 30, marginLeft: 30 }}>
                                <h2>Thông tin đơn hàng</h2>
                                <p>Mã đơn hàng: {data?.code_order}</p>
                                <p>Người tạo: {data?.userId?.username}</p>
                                <p style={getStatusColor(data?.status)}>Trạng thái: {getStatusText(data?.status)}</p>
                                <p>Tổng giá trị đơn hàng: {data?.totalPrice}</p>
                                <p>Ngày tạo: {data?.createdAt}</p>
                                <p>Ngày cập nhật: {data?.updatedAt}</p>

                                <h2>Địa chỉ giao hàng</h2>
                                {data?.address && (
                                    <div>
                                        <p>Thành phố: {data?.address?.city}</p>
                                        <p>Quận/Huyện: {data?.address?.district}</p>
                                        <p>Địa chỉ: {data?.address?.location}</p>
                                    </div>
                                )}
                                <p>Người nhận: {data?.name}</p>
                                <p>Số điện thoại: {data?.phone}</p>
                                <p>Ghi chú: {data?.note}</p>
                            </div>
                            <div style={{ marginRight: 30, marginLeft: 30 }}>
                                <h2>Sản phẩm trong đơn hàng</h2>
                                <ul>
                                    {data?.products?.map((product: any) => (
                                        <li key={product?._id}>
                                            <p>Mã sản phẩm: {product?.productId?._id}</p>
                                            <p>Tên sản phẩm: {product?.productId?.name}</p>
                                            <p>Số lượng: {product?.quantity}</p>
                                            <p>Giá: {product?.price}</p>
                                            <p style={{ display: 'flex' }}>Màu sắc: <div style={{ backgroundColor: product?.color, width: '20px', height: '20px', marginLeft: 20 }}></div></p>
                                            <p>Size: {product?.size}</p>
                                            {product?.productId?.imgUrl && (
                                                <img src={product?.productId?.imgUrl?.[0]} alt={product?.productId?.name} style={{ width: '100px', height: '100px' }} />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {/* <button style={{ borderRadius: 10, height: 40, marginRight: 20, backgroundColor: 'blue', color: 'white' }} onClick={() => onFinish({
                    ...data,
                    status: "1"
                })}>
                    Xác nhận
                </button> */}
                    {data?.status === '1' ? (
                        <Button style={{ height: 40, marginRight: 20 }} disabled>
                            Hủy
                        </Button>
                    ) : data?.status === '2' ? (
                        <Button style={{ height: 40, marginRight: 20 }} disabled>
                            Hủy
                        </Button>
                    ) : (
                        <button style={{ borderRadius: 10, height: 40, marginRight: 20, backgroundColor: 'red', color: 'white' }} onClick={() => onFinish({
                            ...data,
                            status: "2"
                        })}>
                            Hủy
                        </button>
                    )}
                    <Button style={{ height: 40 }} htmlType="button" onClick={() => navigate("/order/view")}>
                        Quay lại
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BillDetailHome;