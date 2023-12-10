import Product from "../models/product.js"
import Category from "../models/category.js"
import DeletedProduct from "../models/deletedData.js"
import { productSchema } from "../schema/product.js"
import mongoose from "mongoose"
import Color from "../models/color.js"
import Size from "../models/size.js"
import Cart from "../models/cart.js"

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({ $or: [{ isDeleted: { $exists: false } }, { isDeleted: false }] })
        .populate({
          path: "variants.size_id",
          model: "Size",
        })
        .populate({
          path: "variants.color_id",
          model: "Color",
        }).exec();
    if (products.length === 0) {
      return res.status(400).json({
        message: "Không có sản phẩm nào",
      })
    }
    for (const product of products) {
      let quantityTotal = 0;
      let sell_quantity = 0;

      // Iterate through each variant of the product
      for (const variant of product.variants) {
        // Calculate total quantities for each product
        quantityTotal += variant.quantity || 0;
        sell_quantity += variant.sell_quantity || 0;
        // Calculate inventory for each variant
        variant.inventory = (variant.quantity || 0) - (variant.sell_quantity || 0);
      }

      // Set total quantities for each product
      product.quantityTotal = quantityTotal;
      product.sell_quantity = sell_quantity;

      // Calculate and set inventoryTotal for each product
      product.inventoryTotal = quantityTotal - sell_quantity;
    }
    return res.status(200).json(products)
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    })
  }
}

export const createProductVariant = async (req, res) => {
  const productId = req.params.id;

  try {
    // Find the product by ID
    const product = await Product.findById(productId).exec();

    if (!product) {
      return res.status(400).json({
        message: "Không có sản phẩm nào",
      });
    }

    // Assuming you have the variant data in the request body
    const variantData = req.body;
    
    // Add the variant to the variants array in the product
    product.variants.push(variantData);
    product.variants.isDeleted = false;
    if (variantData.imgUrl && Array.isArray(variantData.imgUrl)) {
      product.imgUrl = product.imgUrl.concat(variantData.imgUrl);
    }
    // Save the updated product
    await product.save();

    return res.status(201).json({
      message: "Biến thể sản phẩm đã được thêm thành công",
      product: variantData.quantity
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi thêm biến thể sản phẩm:" +error,
    });
  }
};

export const readProduct = async (req, res) => {
  try {
    const data = await Product.findById({ _id: req.params.id })
      .populate({
        path: 'variants',
        populate: [
          { path: 'size_id', model: 'Size' },
          { path: 'color_id', model: 'Color' }
        ]
      })
      .exec()

    if (!data) {
      return res.status(400).json({
        message: "Không có sản phẩm nào",
      })
    }

    // Tăng lượt truy cập của sản phẩm
    try {
      const product = await Product.findById({ _id: req.params.id }).exec();
      if (product) {
        product.views += 1;
        await product.save();
      }
    } catch (error) {
      console.error(error);
    }
        // Thêm trường quantityTotal, sell_quantity_total, inventory_total cho sản phẩm
        data.quantity = 0;
        data.sell_quantity = 0;

        // Duyệt qua từng biến thể và tính tổng
        for (const variant of data.variants) {
          // Thiết lập giá trị mặc định cho sell_quantity nếu không tồn tại
          variant.sell_quantity = variant.sell_quantity || 0;

          // Tính tổng quantityTotal và sell_quantity
          data.quantity += variant.quantity;
          data.sell_quantity += variant.sell_quantity;

          // Thêm trường inventory cho mỗi biến thể
          variant.inventory = variant.quantity - variant.sell_quantity;
        }

        // Thêm trường inventory_total cho sản phẩm
        data.inventory = data.quantity - data.sell_quantity;

    return res.status(200).json(data)
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    })
  }
}

export const createProduct = async (req, res) => {
  try {
    // Kiểm tra xem trường isDeleted có tồn tại trong req.body hay không
    if (!req.body.hasOwnProperty('isDeleted')) {
      // Nếu không tồn tại, thiết lập giá trị mặc định là false
      req.body.isDeleted = false;
    }

    const newProduct = await Product.create(req.body);

    return res.json({
      message: "Thêm sản phẩm thành công",
      data: newProduct,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getSizeByProductId = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id).exec()

    if (!data) {
      return res.status(400).json({
        message: "Không có sản phẩm nào",
      })
    }
    const colorId = req.params.color;
    const filteredData = data.variants.filter(item => item.color_id == colorId);
    const sizeIds = filteredData.map(item => item.size_id);
    const color_id = [
      "6537d795e8b2481b1f10941c"
    ];
    const colors = await Color.find({
      _id: { $nin: color_id }
    });
    return res.status(200).json([color_id,colors])
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    })
  }
}


export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params
    console.log(req.body)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm cần xóa",
      })
    }

    const productToBeDeleted = await Product.findById(req.params.id).exec()
    if (!productToBeDeleted) {
      return res.status(400).json({
        message: "Sản phẩm không tồn tại trong database",
      })
    }

    await Cart.updateMany(
      { "products.productId": productToBeDeleted._id },
      { $pull: { products: { productId: productToBeDeleted._id } } }
    ).exec();
    // Tạo một bản sao của sản phẩm trước khi xóa nó tạm thời

    const deletedProduct = new DeletedProduct(productToBeDeleted.toJSON());

    // Lưu sản phẩm đã xóa vào bảng "deleted_products"
    await deletedProduct.save()

    // Sau đó, xóa sản phẩm khỏi bảng "Product"
    await Product.findByIdAndRemove(req.params.id).exec()

    return res.status(200).json({
      message: "Xoá sản phẩm thành công",
      productRemoved: productToBeDeleted,
    })
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm cần cập nhật",
      })
    }

    const updateData = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec()

    if (!updateData) {
      return res.status(400).json({
        message: "Sản phẩm không tồn tại trong database",
      })
    }

    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      productUpdated: updateData,
    })
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    })
  }
}

// Khôi phục sản phẩm

export const restoreProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Định dạng ID không hợp lệ để khôi phục sản phẩm",
      });
    }

    // Tìm sản phẩm trong bảng "deleted_products"
    const deletedProduct = await DeletedProduct.findById(id).exec()

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm cần khôi phục",
      })
    }

    // Tạo một bản sao của sản phẩm đã xóa
    const restoredProduct = new Product(deletedProduct.toJSON())

    // Lưu sản phẩm đã khôi phục vào bảng "Product"
    await restoredProduct.save()

    // Xóa sản phẩm đã khôi phục khỏi bảng "deleted_products"
    await DeletedProduct.findByIdAndRemove(id).exec()

    return res.status(200).json({
      message: "Khôi phục sản phẩm thành công",
      productRestored: restoredProduct,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
};


// lấy ra tất cả dữ liệu đã xóa
export const getAllDeletedProducts = async (req, res) => {
  try {
    const deletedProducts = await DeletedProduct.find().sort({ createdAt: -1 }).exec();

    if (deletedProducts.length === 0) {
      return res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }

    return res.status(200).json(deletedProducts);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

//Xóa sản phẩm vĩnh viễn
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await DeletedProduct.findByIdAndDelete(id)
    if (!product) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm cần xóa"
      })
    }

    return res.status(200).json({
      message: "Xóa sản phẩm thành công"
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}


//lấy sản phẩm hot
export const getHotProducts = async (req, res) => {
  try {
    const hotProducts = await Product.find()
      .sort({ views: -1 })
      .limit(8)
      .exec();

    if (hotProducts.length === 0) {
      return res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }

    return res.status(200).json(hotProducts);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}


export const getProductList = async (req, res) => {
  try {
    const products = await Product.find({})
        .populate({
          path: 'variants',
          populate: [
            { path: 'size_id', model: 'Size' },
            { path: 'color_id', model: 'Color' }
          ]
        }).exec();

    if (products.length === 0) {
      return res.status(400).json({
        message: "Không có sản phẩm nào",
      });
    }
    for (const product of products) {
      let quantityTotal = 0;
      let sell_quantity = 0;

      // Iterate through each variant of the product
      for (const variant of product.variants) {
        // Calculate total quantities for each product
        quantityTotal += variant.quantity || 0;
        sell_quantity += variant.sell_quantity || 0;

        // Calculate inventory for each variant
        variant.inventory = (variant.quantity || 0) - (variant.sell_quantity || 0);
      }

      // Set total quantities for each product
      product.quantityTotal = quantityTotal;
      product.sell_quantity = sell_quantity;

      // Calculate and set inventoryTotal for each product
      product.inventoryTotal = quantityTotal - sell_quantity;
    }


    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const toggleProductStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm cần cập nhật" + id,
      });
    }

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(400).json({
        message: "Sản phẩm không tồn tại trong database",
      });
    }

    // Kiểm tra nếu trường isDeleted là true thì đặt thành false, ngược lại
    existingProduct.isDeleted = existingProduct.isDeleted ? false : true;

    const updatedProduct = await existingProduct.save();

    return res.status(200).json({
      message: `Sản phẩm đã được ${existingProduct.isDeleted ? 'xóa' : 'khôi phục'}`,
      productUpdated: updatedProduct,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};


export const deleteVariant = async (req, res) => {
  try {
    const { productId, variantId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId) || isNaN(parseInt(variantId)) || parseInt(variantId) < 0) {
      return res.status(400).json({
        message: "ID sản phẩm hoặc ID variant không hợp lệ",
        data: req.body
      });
    }


    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm cần xóa variant",
      });
    }

    // Lọc ra các variants có id không phải là variantId

    // Gán lại mảng variants mới cho product
    product.variants = product.variants.splice(variantId, 1);

    await product.save();

    return res.status(200).json({
      message: "Xóa variant thành công",
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const reportProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id })
      .exec();

    if (!product) {
      return res.status(400).json({
        message: "Không có sản phẩm nào",
      });
    }

    // Thêm trường quantityTotal, sell_quantity_total, inventory_total cho sản phẩm
    product.quantityTotal = 0;
    product.sell_quantity = 0;

    // Duyệt qua từng biến thể và tính tổng
    for (const variant of product.variants) {
      // Thiết lập giá trị mặc định cho sell_quantity nếu không tồn tại
      variant.sell_quantity = variant.sell_quantity || 0;

      // Tính tổng quantityTotal và sell_quantity
      product.quantityTotal += variant.quantity;
      product.sell_quantity += variant.sell_quantity;

      // Thêm trường inventory cho mỗi biến thể
      variant.inventory = variant.quantity - variant.sell_quantity;
    }

    // Thêm trường inventory_total cho sản phẩm
    product.inventoryTotal = product.quantityTotal - product.sell_quantity;
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
