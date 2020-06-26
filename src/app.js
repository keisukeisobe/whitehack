require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const characterRouter = require('./characters/characterRouter');
const usersRouter = require('./users/usersRouter');
const authRouter = require('./auth/authRouter');
const equipmentRouter = require('./equipment/equipmentRouter');
const itemsRouter = require('./items/itemsRouter');
const weaponsRouter = require('./weapons/weaponsRouter');

const app = express();

const morganOption = (process.env.NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("App successfully loaded!");
});

app.get("/ponies", function (req, res) {
  res.send("Ponies!");
});

// app.use("/api", [authRouter, usersRouter, characterRouter, equipmentRouter]);

app.use('/api', authRouter);
app.use('/api', usersRouter);
app.use('/api', characterRouter);
app.use('/api', equipmentRouter);
app.use('/api', weaponsRouter);
app.use('/api', itemsRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
