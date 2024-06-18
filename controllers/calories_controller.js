import CaloriesItem from "../models/calories_model.js";
import User from "../models/user_model.js";
import categories from "../const.js";

//POST Request
export const addCaloriesItem = async (req, res) => {
  try {
    //find the first user matches the user_id
    const userExist = await User.findOne({ id: req.body.user_id });
    //user not exist
    if (!userExist) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    if (!req.body.year && !req.body.month && !req.body.day) {
      //if year, month, day are not provided set them to the current date
      req.body.year = new Date().getFullYear();
      req.body.month = new Date().getMonth() + 1;
      req.body.day = new Date().getDate();
    }
    if (!req.body.year || !req.body.month || !req.body.day) {
      //if year OR month OR day return error
      return res.status(400).send({
        message: "Year or Month or Day are required",
      });
    }
    // Create a new calories item using the request body
    const newCaloriesItem = new CaloriesItem (req.body);
    await  newCaloriesItem.save();

    // Send a success response with the created calories item
    res.status(201).send(newCaloriesItem); // Assuming you want to return the created item to the client);
  } catch (error) {
    // Send an error response if the creation fails
    res.status(500).send({
      message: "Calories Item creation failed",
      error: error.message,
    });
  }
};

//GET Request
export const getReport = async (req, res) => {
    try {
      const { user_id, year, month } = req.query;
      //find the first user matches the user_id
      const userExist = await User.findOne({ id: req.query.user_id });
      //user not exist
      if (!userExist) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      //find all matches of user_id, year, month 
      const costs = await CaloriesItem.find({ user_id, year, month });
      //iterates over the categories array and accumulates results into an object.
      const reports = categories.reduce((acc, category) => {
        acc[category] = costs
        //for each category filter the cost array to include only the items where cost.category = category.
        .filter((cost) => cost.category === category)
        //maps over the filtered costs array to create a new array of objects, each containing only the day, description, and amount fields.
        .map(({ day, description, amount}) => ({ day, description, amount }));
        return acc;
      }, {});
  
      // Send a success response with the report cost item
      res.status(200).send(reports);
      // Send an error response if the report fails
    } catch (error) {
      res.status(400).send({
        message: "Report failed",
        error: error.message,
      });
    }
  };
