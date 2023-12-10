

import { Spin } from "antd";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ
        zIndex: 9999, // Độ sâu lớp
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default Loading;
