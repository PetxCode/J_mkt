import { Router } from "express";
import {
  getAllUser,
  getOneUser,
  registerAdmin,
  registerBuyer,
  registerUser,
  signInUser,
  updateUserdescription,
  updateUserImage,
  updateUserInfo,
  updateUserName,
} from "../controller/userController";
import multer from "multer";
const upload = multer().single("image");

const userRouter = Router();

userRouter.route("/:adminID/register-users").post(registerUser);

userRouter.route("/register-admin").post(registerAdmin);
userRouter.route("/register-buyer").post(registerBuyer);

userRouter.route("/sign-in-user").post(signInUser);

userRouter.route("/get-all-user").get(getAllUser);
userRouter.route("/:userID/get-one-user").get(getOneUser);

userRouter.route("/:userID/update-image").patch(upload, updateUserImage);
userRouter.route("/:userID/update-name").patch(updateUserName);
userRouter.route("/:userID/update-detail").patch(updateUserdescription);
userRouter.route("/:userID/update-info").patch(upload, updateUserInfo);

export default userRouter;
