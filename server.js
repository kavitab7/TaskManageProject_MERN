const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./dbConnection')
const morgan = require('morgan')
const userRoutes = require('./Routes/userRoutes')
const taskRoutes = require('./Routes/taskRoutes');
const requireSignIn = require('./middlewares/auth');
const path = require('path')
const app = express();

dotenv.config()
connectDB();

app.use(express.json())
app.use(morgan('dev'))

app.use('/auth', userRoutes)
app.use('/task', requireSignIn, taskRoutes)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './client/src/index.html'));
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})