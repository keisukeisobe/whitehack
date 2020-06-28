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

function makeCharactersArray() {
  return [
    {
      id: 1,
      charactername: "Valtyra",
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      charisma: 10,
      wisdom: 10,
      characterclass: "Strong",
      characterlevel: 1,
      hitdie: 1,
      experience: 0,
      attackvalue: 10,
      savingthrow: 7,
      slots: 1,
      miracles: "",
      groups: "",
      raises: 0,
      gold: "",
      encumbrance: 0,
      movement: 30,
      armorclass: 0,
      initiativebonus: 0,
      languages: "Common"
    },
    {
      id: 2,
      charactername: "Morgan",
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      charisma: 10,
      wisdom: 10,
      characterclass: "Deft",
      characterlevel: 1,
      hitdie: 1,
      experience: 0,
      attackvalue: 10,
      savingthrow: 7,
      slots: 1,
      miracles: "",
      groups: "",
      raises: 0,
      gold: "",
      encumbrance: 0,
      movement: 30,
      armorclass: 0,
      initiativebonus: 0,
      languages: "Common"
    },
  ];
}

function makeWeaponsArray() {
  return [
    {
      id: 1,
      name: "Axe",
      damagedie: "1d6",
      damagebonus: 1,
      special: "",
      range: 0,
      firerate: 0,
      cost: 10,
      weight: 6,
      description: "Typical axe"
    },
    {
      id: 2,
      name: "Javelin",
      damagedie: "1d6",
      damagebonus: 0,
      special: "1d6-2 damage in melee",
      range: 40,
      firerate: 1,
      cost: 2,
      weight: 2,
      description: "6 pack of throwing javelins"
    },
    {
      id: 3,
      name: "Scimitar",
      damagedie: "1d6",
      damagebonus: 0,
      special: "+1 AV while riding",
      range: 0,
      firerate: 0,
      cost: 8,
      weight: 5,
      description: "Curved swords"
    }
  ];
}

function makeItemsArray() {
  return [
    {
      id: 1,
      name: "Backpack",
      description: "Standard adventuring gear with 30lb capacity",
      cost: 5,
      weight: 1
    },
    {
      id: 2,
      name: "Cart",
      description: "Horse-drawn cart with 300lb capacity",
      cost: 60,
      weight: 500
    },
    {
      id: 3,
      name: "Grappling Hook",
      description: "Lets you traverse",
      cost: 5,
      weight: 5
    }
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
  makeCharactersArray,
  makeWeaponsArray,
  cleanTables,
  seedTables,
  makeAuthHeader
};