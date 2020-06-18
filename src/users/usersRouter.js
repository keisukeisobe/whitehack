const express = require('express');
const UsersService = require('./usersService');
const usersRouter = express.Router();
const jsonParser = express.json();
const path = require('path');

usersRouter.route('/users')
  .post(jsonParser, (req, res, next) => {
    const {username, email, password} = req.body;
    const db = req.app.get('db');
    for (const field of ['username', 'email', 'password']){
      if(!req.body[field]){
        return res.status(400).json({error: `Missing ${field} in request body`});
      }
    }
    const passwordError = UsersService.validatePassword(password);
    if(passwordError){
      return res.status(400).json({error: passwordError});
    }
    UsersService.hasUserWithUserName(db, username)
      .then(hasUserWithUserName => {
        if(hasUserWithUserName){
          return res.status(400).json({error: 'Username already taken'});
        }
        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              username,
              email,
              password: hashedPassword
            };
            return UsersService.insertUser(db, newUser)
              .then(user => {
                res.status(201).location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user));
              })
          })
      })
  })