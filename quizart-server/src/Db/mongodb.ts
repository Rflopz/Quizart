import mongoose from "mongoose";

const { MONGODB_PWD, MONGODB_USR, MONGODB_CONN } = Bun.env;

const connectToMongodb = async () => {
  const mongoURI = `mongodb+srv://${MONGODB_USR}:${MONGODB_PWD}@${MONGODB_CONN}/?retryWrites=true&w=majority`;

  const connection = await mongoose.connect(mongoURI, {
    retryWrites: true,
    w: "majority",
  });

  if (!connection) throw new Error("Server not available");
};

export default connectToMongodb;
