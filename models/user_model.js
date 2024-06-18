import mongoose from "mongoose";

//Creating a new Schema(collection) of users
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "User property must include ID!"],
  },
  first_name: {
    type: String,
    required: [true, "User property must include first name!"],
  },
  last_name: {
    type: String,
    required: [true, "User property must include last name!"],
  },
  birthday: {
    type: String,
    required: [true, "User property must include birthday!"],
  },
});

export default mongoose.model("Users", userSchema);
