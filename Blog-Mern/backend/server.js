const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
const blogsRouter = require('./routes/BlogsRoutes');
const userRouter = require('./routes/UserRoutes');
const app = express();

//routes

app.use('/api/blogs', blogsRouter);
app.use('/api/user', userRouter);

app.listen(process.env.PORT || 4000, () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('you are now connected to db');
    })
    .catch((error) => {
      console.log('Not able to connect to database due to :' + error);
    });
  console.log('Listening to port ' + process.env.PORT);
});
