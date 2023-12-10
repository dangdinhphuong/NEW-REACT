
// import { Space, Table } from 'antd';
// import { useGetUserOrdersQuery } from '../Services/Api_Order';




// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];

// const {data:viewOrder} = useGetUserOrdersQuery()
// console.log(viewOrder);

// // const data = viewOrder.map()
// const ViewOrder = () => <Table columns={columns}  />;

// export default ViewOrder;