import Order from "../models/order.js";
import Comment from "../models/comment.js";

export const createComment = async (req, res) => {
  try {
    const { userId, productId, orderId, content } = req.body;

    console.log(orderId);

    // Kiểm tra xem người dùng đã bình luận trước đó chưa
    const existingComment = await Comment.findOne({ userId, productId });
    if (existingComment) {
      return res.status(400).json({ message: "Bạn đã bình luận sản phẩm này trước đó." });
    }

    // Kiểm tra người dùng đã mua sản phẩm trong đơn hàng chưa
    const hasBoughtProduct = await Order.exists({ _id: orderId, userId, "products.productId": productId });
    if (!hasBoughtProduct) {
      return res.status(400).json({ message: "Bạn không có quyền bình luận sản phẩm này." });
    }

    // Kiểm tra trạng thái của đơn hàng
    const order = await Order.findById(orderId);
    if (!order || order?.status !== '4') {
      // console.log(order?.status);
      return res.status(400).json({ message: "Đơn hàng không tồn tại hoặc đã bị hủy." });
    }

    // Tạo bình luận mới
    const comment = await Comment.create({ userId, productId, orderId, content });

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi tạo bình luận." });
  }
};

export const getAllComments = async (req, res) => {
  try {
   
    const comments = await Comment.find()
      .populate("userId", "-password") // Populate thông tin người dùng, loại bỏ trường password
      .populate("productId"); // Populate thông tin sản phẩm
      // Truy cập trường productId trong từng comment
      // comments.forEach(comment => {
      //   console.log(comment.productId?._id);
      // });

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi lấy danh sách bình luận." });
  }
};

export const getCommentsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    // Lấy tất cả các bình luận dựa trên productId
    const comments = await Comment.find({ productId }).populate("userId");

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi lấy danh sách bình luận." });
  }
};

export const updateCommentById = async (req, res) => {
  try {
    // console.log(req.body);
    const { id } = req.params;
    const { content } = req.body;

    // Tìm bình luận dựa trên id
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Bình luận không tồn tại." });
    }

    // Kiểm tra xem người dùng có quyền chỉnh sửa bình luận hay không
    if (comment.userId.toString() !== req.body.userId) {
      return res.status(403).json({ message: "Bạn không có quyền chỉnh sửa bình luận này." });
    }

    // Cập nhật nội dung bình luận
    comment.content = content;
    comment.updatedAt = Date.now();
    await comment.save();

    return res.status(200).json({ message: "Đã cập nhật bình luận thành công." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật bình luận." });
  }
};

// delete comment của user
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm bình luận dựa trên id
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Bình luận không tồn tại." });
    }

    // Kiểm tra xem người dùng có quyền xóa bình luận hay không
    if (comment.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Bạn không có quyền xóa bình luận này." });
    }

    // Xóa bình luận
    await Comment.findByIdAndRemove(id);

    return res.status(200).json({ message: "Đã xóa bình luận thành công." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi xóa bình luận." });
  }
};

// delete comment cho admin
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Xóa bình luận dựa trên id
    const deletedComment = await Comment.findByIdAndRemove(id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Bình luận không tồn tại." });
    }

    return res.status(200).json({ message: "Đã xóa bình luận thành công." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi xóa bình luận." });
  }
};