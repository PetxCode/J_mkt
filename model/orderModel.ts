import { Document, model, Schema, Types } from "mongoose";

interface iOrder {
  title: string;
  productOwner: string;
  img: string;
  description?: string;
  amountPaid: number;
  QTYOrder: number;

  userID: string;
  users: {};
}

interface iOrderData extends iOrder, Document {}

const orderModel = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    productOwner: {
      type: String,
    },
    orderOwner: {
      type: String,
    },

    img: {
      type: String,
    },
    description: {
      type: String,
    },

    amountPaid: {
      type: Number,
    },

    QTYOrder: {
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
export default model<iOrderData>("orders", orderModel);
