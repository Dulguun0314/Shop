import { connect } from "mongoose";

export const connectToDatabase = async () => {
  await connect(
    "mongodb+srv://Dulguun:Dulguun0714@cluster0.ljmmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  console.log("Connected to database");
};
