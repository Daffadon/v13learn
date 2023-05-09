import mongoose, { ConnectOptions } from "mongoose";
import { connected } from "process";

let isConnected = false;
export const connectToDB = async () => {
  const option = {
    dbName: "try-to-code",
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
    console.log("connected with mongodb");
  } catch (error) {
    console.log(error);
  }
};
