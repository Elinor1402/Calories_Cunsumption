import User from "../models/user_model.js";

//GET Request
export const getUser = async (req, res) => {
    //find the first user matches the id
    User.findOne({ id: req.params.id })
    .then(user => res.json(user))
    .catch(err => res.status(400).send(err.toString()));
}
