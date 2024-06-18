import mongoose from "mongoose";
import categories from "../const.js";
import { isValidDay } from "../utlis.js";

//Creating a new Schema(collection) of calories
const caloriesSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: [true, "Calories item must include a user ID!"],
  },

  year: {
    type: Number,
    min: 1900,
    max: 2100,
  },

  month: {
    type: Number,
    min: 1,
    max: 12,
  },

  day: {
    //only days that matches the correspond months
    type: Number,
    validate: {
      validator: function (value) {
        return isValidDay(this.year, this.month, value);
      },
      message: (props) => `${props.value} is not a valid day!`,
    },
  },

  id: {
    type: Number,
    default: new Date().getTime(), //unique id
  },

  description: {
    type: String,
    required: [true, "Calories item must include a description!"],
  },

  category: {
    type: String,
    required: [true, "Calories item must include a category!"],
    validate: {
      //Only Categories like breakfast lunch etc....
      validator: function (value) {
        return categories.includes(value);
      },
      message: (props) => `${props.value} is not a valid category!`,
    },
  },

  amount: {
    type: Number,
    required: [true, "Calories item must include an amount!"],
    min: 0,
  },
});

export default mongoose.model("Calories", caloriesSchema);
