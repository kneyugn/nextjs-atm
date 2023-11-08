import mongoose from "mongoose";
import { getMongoURI } from "../utils/helper";

const connectDB = async () => {
  try {
    const mongoURI = getMongoURI();
    mongoose.connect(mongoURI, {
      maxPoolSize: 1,
      minPoolSize: 1,
      socketTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      maxIdleTimeMS: 10000,
    });
    return mongoose;
  } catch (err) {
    console.log("error creating mongo connection");
  }
};

export default connectDB;
