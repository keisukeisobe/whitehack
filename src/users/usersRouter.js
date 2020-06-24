const express = require('express');
const UsersService = require('./usersService');
const usersRouter = express.Router();
const jsonParser = express.json();
const path = require('path');
const {requireAuth} = require('../middleware/jwt-auth');

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
                res.status(201).location(path.posix.join(req.originalUrl, `/${user.login_id}`))
                  .json(UsersService.serializeUser(user));
              })
          })
      })
  });

usersRouter.route('/users/:user_id')
  .all(requireAuth)
  .patch(jsonParser, (req, res, next) => {
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
            return UsersService.updateUser(db, newUser)
              .then(user => {
                res.status(201).location(path.posix.join(req.originalUrl, `/${user.login_id}`))
                  .json(UsersService.serializeUser(user));
              })
          })
      })

  })
  .delete((req, res) => {
    const db = req.app.get('db');
    const {username, email, password} = req.body;
    db.from('login').where(username).del(); 
    res.send('Account deleted');
  })

  module.exports = usersRouter;