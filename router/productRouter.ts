import { Router } from "express";
import {
  createProduct,
  readProduct,
  readOneProduct,
  purchaseProduct,
  viewOrders,
  deleteProduct,

  // ProductPayment,
  // updateProductAmount,
  // updateProductImg,
  // updateProductName,
  // updateProducts,
  // updateProductStock,
  // updateProductToggle,
  // updateProductTotal,
} from "../controller/productController";
import multer from "multer";
const upload = multer().single("image");

const productRouter = Router();

productRouter.route("/:userID/register-products").post(upload, createProduct);
productRouter.route("/get-all-product").get(readProduct);
productRouter.route("/:productID/get-one-product").get(readOneProduct);
productRouter
  .route("/:userID/:productID/purchase-product")
  .post(purchaseProduct);

productRouter.route("/:userID/view-orders").get(viewOrders);
productRouter.route("/:userID/:productID/delete-product").delete(deleteProduct);

// productRouter.route("/:productID/update-product").patch(upload, updateProducts);
// productRouter.route("/update-product-amount").patch(updateProductAmount);
// productRouter.route("/:productID/update-product-name").patch(updateProductName);

// productRouter
//   .route("/:productID/update-product-img")
//   .patch(upload, updateProductImg);
// productRouter
//   .route("/:productID/update-product-total")
//   .patch(updateProductTotal);
// productRouter
//   .route("/:adminID/:productID/admin-delete-product")
//   .delete(deleteProduct);
// productRouter
//   .route("/update-stock-product/:productID")
//   .patch(updateProductStock);
// productRouter
//   .route("/update-toggle-product/:productID")
//   .patch(updateProductToggle);

export default productRouter;
