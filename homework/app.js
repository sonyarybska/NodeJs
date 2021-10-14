const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const {MONGO_URL,PORT} = require('./configs/config');
const {authRouter, userRouter} = require('./routers');

mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/users', userRouter);
app.use('/auth', authRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({message: err.message});
});

app.listen(PORT, () => {
    console.log('App listen 5000');
});
