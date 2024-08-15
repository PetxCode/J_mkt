import { connect } from "mongoose";
import env from "dotenv";
env.config();

const BounMark: string = process.env.MONGOOSESTRING!;

export const boundM = async () => {
  try {
    await connect(BounMark).then(() => {
      console.log(`connected to ${BounMark}`);
    });
  } catch (error: any) {
    console.log(`error connecting to ${BounMark} ${error}`);
  }
};
