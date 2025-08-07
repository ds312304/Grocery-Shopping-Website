import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(`${process.env.MONGODB_URI}/greenCart`, {
      serverSelectionTimeoutMS: 5000, // Wait up to 5s
      socketTimeoutMS: 45000,         // Socket timeout
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
