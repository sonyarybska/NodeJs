const express = require('express');
const mongoose=require('mongoose');

const {PORT,MONGO_URL}=require('./configs/config');

const userRouter = require('./routers/user.router');
const authRouter = require('./routers/auth.router');


mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/users', userRouter);
app.use('/login', authRouter);

app.listen(PORT, () => {
    console.log('App listen 5000');
});
