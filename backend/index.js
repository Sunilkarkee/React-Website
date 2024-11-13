const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
cookieParser = require('cookie-parser')


const app = express();

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port:", PORT);
        console.log('Connected to DB');
    });
}).catch(err => {
    console.error('Database connection failed:', err);
});
