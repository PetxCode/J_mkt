import { Request, Response } from "express-serve-static-core";
import userModel from "../model/userMode";
import { HTTP } from "../error/mainError";
import { genSalt, hash, compare } from "bcryptjs";
import { streamUpload } from "../utils/stream";

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user?.verify) {
      const comp = await compare(password, user?.password);

      if (comp) {
        return res.status(HTTP.CREATED).json({
          message: `welcome ${user.name}`,
          data: user,
        });
      } else {
        return res.status(HTTP.BAD_REQUEST).json({
          message: `Incorrect Password`,
        });
      }
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `please register as a user`,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error signing in :${error}`,
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(HTTP.OK).json({
      message: "all user gotten",
      data: user,
      totalUse: user.length,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error signing in :${error}`,
    });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    return res.status(HTTP.OK).json({
      message: "one user gotten",
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error getting one in :${error}`,
    });
  }
};

export const updateUserImage = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { secure_url, public_id }: any = streamUpload(req);

    const user = await userModel.findByIdAndUpdate(
      userID,
      {
        image: secure_url,
        imageID: public_id,
      },
      { new: true }
    );
    return res.status(HTTP.CREATED).json({
      message: `user avatar updated`,
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error updating admin image ${error} `,
    });
  }
};

export const updateUserName = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const { name } = req.body;

    const user = await userModel.findByIdAndUpdate(
      userID,
      {
        name,
      },
      { new: true }
    );

    return res.status(HTTP.CREATED).json({
      message: " name updated ",
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `user name not updated ${error}`,
    });
  }
};

export const updateUserdescription = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { description } = req.body;

    const user = await userModel.findByIdAndUpdate(
      userID,
      {
        description,
      },
      { new: true }
    );
    return res.status(HTTP.CREATED).json({
      message: "user description updated ",
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error updating details: ${error}`,
    });
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { name, description } = req.body;
    const { secure_url, public_id }: any = streamUpload(req);

    const user = await userModel.findByIdAndUpdate(
      userID,
      {
        name,
        description,
        image: secure_url,
        imageID: public_id,
      },
      { new: true }
    );

    return res.status(HTTP.CREATED).json({
      message: `user information updated`,
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `error updating user info ${error} `,
    });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, role, password, secretCode, status } = req.body;
    const secret = "AjegunleCore";

    if (secret === secretCode) {
      const salt = await genSalt(2);
      const harsh = await hash(password, salt);
      const user = await userModel.create({
        name,
        email,
        password: harsh,
        status,
        secretCode,
        role: "ADMIN",
        verify: true,
      });
      return res.status(HTTP.CREATED).json({
        message: "user created",
        data: user,
      });
    } else {
      return res.status(HTTP.OK).json({
        message: `your secretcode is wronge`,
      });
    }
  } catch (error) {
    return res.status(HTTP.OK).json({
      message: `error creating user ${error}`,
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { adminID } = req.params;

    const { name, email, password, status } = req.body;

    const admin = await userModel.findById(adminID);

    const salt = await genSalt(2);
    const harsh = await hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: harsh,
      status,
      role: "USER",
      verify: true,
    });

    return res.status(HTTP.CREATED).json({
      message: "user created",
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.OK).json({
      message: `error creating user ${error}`,
    });
  }
};

export const registerBuyer = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const salt = await genSalt(2);
    const harsh = await hash(password, salt);
    const buyer = await userModel.create({
      name,
      email,
      password: harsh,
      role: "BUYER",
      verify: true,
    });
    return res.status(HTTP.CREATED).json({
      message: "user created",
      data: buyer,
    });
  } catch (error) {
    return res.status(HTTP.OK).json({
      message: `error creating user ${error}`,
    });
  }
};
