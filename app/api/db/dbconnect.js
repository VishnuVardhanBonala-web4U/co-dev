import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect("mongodb://localhost:27017");
  } catch (error) {
    throw new Error("Connection failed!");
  }
}

export default dbConnect;
