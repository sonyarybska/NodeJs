const express=require('express');
const userRouter=require('./routers/user.router');

const app=express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/users',userRouter);

app.listen(5000,()=>{
    console.log('App listen 5000');
});