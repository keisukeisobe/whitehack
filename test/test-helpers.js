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

function makeEquipmentArray() {
  return [
    {
      id: 1,
      name: "Shield",
      armorclass: "1",
      cost: 5,
      weight: 10,
      special: "",
      description: "Standard shield"
    },
    {
      id: 2,
      name: "Studded Leather",
      armorclass: "2",
      cost: 20,
      weight: 20,
      special: "",
      description: "Studded leather armor. Sturdy."
    },
    {
      id: 3,
      name: "Full Plate",
      armorclass: "6",
      cost: 50,
      weight: 60,
      special: "",
      description: "Heavy."
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
    if (characters.length > 0){
      await trx.into('characters').insert(characters);
      await trx.raw('SELECT setval(\'characters_id_seq\', ?)', [characters[characters.length-1].id]);  
    }
    if (items.length > 0){
      await trx.into('items').insert(items);
      await trx.raw('SELECT setval(\'items\', ?)', [items[items.length-1].id]);
    }
    if (equipment.length > 0){
      await trx.into('equipment').insert(equipment);
      await trx.raw('SELECT setval(\'equipment\', ?)', [equipment[equipment.length-1].id]);
    }
    if (weapons.length > 0){
      await trx.into('weapons').insert(weapons);
      await trx.raw('SELECT setval(\'weapons\', ?)', [weapons[weapons.length-1].id]);
    }
  });
}

//function makeMaliciousCharacter/Item/Equipment/Weapon

function makeFixtures() {
  const testUsers = makeUsersArray();
  const testCharacters = makeCharactersArray();
  const testWeapons = makeWeaponsArray();
  const testItems = makeWeaponsArray();
  const testEquipment = makeEquipmentArray();
  return {testUsers, testCharacters, testWeapons, testItems, testEquipment};
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
  makeItemsArray,
  makeEquipmentArray,
  makeFixtures,
  cleanTables,
  seedTables,
  makeAuthHeader
};