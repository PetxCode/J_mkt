import { Document, model, Schema, Types } from "mongoose";

interface iProduct {
  title: string;
  postBy: string;
  img: string;
  description?: string;
  amount: number;
  QTYinStock: number;
  storeID: string;
  toggle: boolean;

  userID: string;
  users: {};
}

interface iProductData extends iProduct, Document {}

const productModel = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    userID: {
      type: String,
    },
    postBy: {
      type: String,
    },
    img: {
      type: String,
    },
    description: {
      type: String,
    },
    storeID: {
      type: String,
    },
    amount: {
      type: Number,
    },
    toggle: {
      type: Boolean,
      default: false,
    },
    QTYinStock: {
      type: Number,
      default: 0,
    },

    users: {
      type: Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
export default model<iProductData>("prods", productModel);
