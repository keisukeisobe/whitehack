const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
const xss = require('xss');
const bcrypt = require('bcryptjs');

const UsersService = {
  getAllUsers(db) {
    return db.from('login').select('*');
  },
  getUser(db) {
    return db.from('login').select('*').where('username', username);
  },
  hasUserWithUserName(db, username) {
    return db.from('login').where({username}).first().then(user => !!user);
  },
  validatePassword(password) {
    if(password.length < 9) {
      return 'Password must be longer than 8 characters';
    }
    if(password.length >= 72) {
      return 'Password must be less than 72 characters';
    }
    if(password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty space';
    }
    if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)){
      return 'Password must contain 1 upper case, 1 lower case, and 1 special character';
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      username: xss(user.username),
    };
  },
  insertUser(db, newUser) {
    return db.insert(newUser).into('login').returning('*').then(([user]) => user);
  },
  updateUser(db, user) {
    return db.from('login').where({username: user.username}).update(user);
  }
};

module.exports = UsersService;