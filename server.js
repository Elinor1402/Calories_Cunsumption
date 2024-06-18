import express from "express";
import dotenv from "dotenv";
import { mongoDbConnection } from "./utlis.js";
import userRoutes from './routes/user.js';
import caloriesRoutes from './routes/calories.js';

dotenv.config();
const app = express();

//middlewares
app.use(express.json());
//app.use(cors());


//connecting to DataBase
mongoDbConnection();


// About Route
app.get('/about', (req, res) => {
    res.json([
        { firstname: 'Elinor', lastname: 'Zalogin', id: '208324863', email: 'elinor.zalogin@gmail.com' },
        { firstname: 'Yitzhak', lastname: 'Keidar', id: '066016155', email: 'keidar17@gmail.com' },
        { firstname: 'Amit', lastname: 'Cohen', id: '207803289', email: 'amitps123045@gmail.com' }
    ]);
});

//use routes
app.use('/users', userRoutes);
app.use('/', caloriesRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});