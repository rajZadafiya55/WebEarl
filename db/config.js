import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    mongoose
      .connect(`${process.env.MONGODB_URI}`)
      .then(() => {
        console.log("database conectioned");
      })
      .catch((error) => {
        console.log("database connecetion failed.!", error);
      });
  } catch (error) {
    console.log("error", error);
  }
};

export default connectionDB;
