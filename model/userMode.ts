import { model, Schema, Types, Document } from "mongoose";
interface iUser {
  name: string;
  email: string;
  role: string;
  password: string;
  secretCode: string;
  description?: string;
  products: {}[];
  myStore: {}[];
  order: {}[];
  verify: boolean;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      require: true,
    },

    role: {
      type: String,
    },

    description: {
      type: String,
    },

    secretCode: {
      type: String,
      require: true,
    },

    verify: {
      type: Boolean,
      default: false,
    },

    myStore: [
      {
        type: Types.ObjectId,
        ref: "prods",
      },
    ],

    order: [
      {
        type: Types.ObjectId,
        ref: "orders",
      },
    ],
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
