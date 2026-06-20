const express = require('express');
const aiRoutes = require('./routes/ai.routes.js');
const authRouter = require('./routes/auth.route.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express(); // when express call server will create

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


app.use('/ai',aiRoutes);
app.use('/auth', authRouter);



module.exports = app;

