const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./dbConnection')
const morgan = require('morgan')
const userRoutes = require('./Routes/userRoutes')
const taskRoutes = require('./Routes/taskRoutes')
const app = express();

dotenv.config()
connectDB();

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use('/auth', userRoutes)
app.use('/task', taskRoutes)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})