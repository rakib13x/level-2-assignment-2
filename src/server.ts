import mongoose from "mongoose";

export const connectDB = (uri: string) => {
  mongoose
    //database connection
    .connect(uri, {
      dbName: "level-2",
    })
    .then((c) => console.log(`Db Connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};
