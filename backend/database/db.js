import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@blog-app.ryos7qj.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};
export default Connection;
