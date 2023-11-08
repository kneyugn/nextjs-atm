import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/atm", {
      maxPoolSize: 1,
      minPoolSize: 1,
      socketTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      maxIdleTimeMS: 10000,
    });
  } catch (err) {
    console.log("error creating mongo connection");
  }
};

export default connectDB;
