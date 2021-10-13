const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config({path:`${__dirname}/.env`});

const {mainConfigs} = require('./configs');

const {authRouter, userRouter} = require('./routers');

mongoose.connect(mainConfigs.MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/users', userRouter);
app.use('/login', authRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({message: err.message});
});

app.listen(mainConfigs.PORT, () => {
    console.log(process.env);
    console.log('App listen 5000');
});
