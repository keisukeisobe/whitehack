const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 7)
  }));
  return db.into('login').insert(preppedUsers)
    .then( () => 
      db.raw('SELECT setval(\'login_login_id_seq\', ?)', [users[users.length-1].login_id])
    );
}

function makeUsersArray() {
  return [
    {
      login_id: 1,
      username: 'test-user-1',
      email: 'info1@email.com',
      password: 'Password1!',
    },
    {
      login_id: 2,
      username: 'test-user-2',
      email: 'info2@email.com',
      password: 'password',
    },
    {
      login_id: 3,
      username: 'test-user-3',
      email: 'info3@email.com',
      password: 'password',
    },
    {
      login_id: 4,
      username: 'test-user-4',
      email: 'info4@email.com',
      password: 'password',
    },
  ];
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      userchars,
      items,
      equipment,
      weapons,
      characters,
      login
      RESTART IDENTITY CASCADE`
  );
}

function seedTables(db, users, items, equipment, weapons, characters){
  return db.transaction(async trx => {
    await seedUsers(db, users);
    // await trx.into('books').insert(books);
    // await trx.raw('SELECT setval(\'books_id_seq\', ?)', [books[books.length-1].id]);
    // if (progress.length > 0){
    //   await trx.into('progress').insert(progress);
    //   await trx.raw('SELECT setval(\'progress_id_seq\', ?)', [progress[progress.length-1].id]);
    // }
    // if(ratings.length > 0){
    //   await trx.into('ratings').insert(ratings);
    //   await trx.raw('SELECT setval(\'ratings_id_seq\', ?)', [ratings[ratings.length-1].id]);
    // }
  });
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({user_id: user.id}, secret, {subject: user.username, algorithm: 'HS256'});
  return `Bearer ${token}`;
}

module.exports = {
  seedUsers,
  makeUsersArray,
  cleanTables,
  seedTables,
  makeAuthHeader
}