import mongoose, { ConnectOptions } from "mongoose";
import { connected } from "process";

let isConnected = false;
export const connectToDB = async () => {
  const option = {
    dbName: "",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI || "", option);
    isConnected = true;
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
