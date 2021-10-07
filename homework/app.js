const express = require('express');
const  mongoose=require('mongoose');

const userRouter = require('./routers/user.router');

mongoose.connect('mongodb://localhost:27017/lesson3');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/users', userRouter);

app.listen(5000, () => {
    console.log('App listen 5000');
});