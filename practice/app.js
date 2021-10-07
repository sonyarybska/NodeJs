const express = require('express');
const mongoose=require('mongoose');

const carsRouter = require('./routers/car.router');
const {PORT,MONGO_URL}=require('./configs/config');

mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/cars', carsRouter);


app.listen(PORT, () => {
    console.log('App listen 5000');
});
