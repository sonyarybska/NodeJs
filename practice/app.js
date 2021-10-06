const express = require('express');

const calculatorRouter = require('./routers/calculator.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/calculator', calculatorRouter);

app.listen(5000, () => {
    console.log('App listen 5000');
});