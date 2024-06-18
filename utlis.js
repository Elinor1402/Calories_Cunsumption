import mongoose from "mongoose";

export const mongoDbConnection = async () => {
 // Connect to MongoDB
  try {
    await mongoose.connect(process.env.DB);
  } catch (e) {
    console.log("Database connection failed", error.message);
  }
};
export const isValidDay = (year, month, day) => {
  // Adjust month value since JavaScript months are zero-based (0 for January, 11 for December)
  month--;
  // Create a Date object with the provided year, month, and day
  const date = new Date(year, month, day);
  // Check if the year, month, and day match the provided values
  // (JavaScript will automatically adjust the day if it's out of range for the given month)
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
};


