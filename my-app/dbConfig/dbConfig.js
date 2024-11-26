import mongoose from "mongoose";

export async function connectdb() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;
    connection.on('connected',() => {
      console.log("MongoDB is connected");
    }
    )
    connection.on('error',() => {
      console.log("MongoDB connection error" + err);
      process.exit()
    }
    )
  } catch (error) { 
    console.log("DB not connected");
    console.log(error);
  }
}
