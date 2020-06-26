const CharacterService = {
  getAllCharacters(db) {
    return db.from('characters')
      .select('*');
  },
  getCharacterById(db, id) {
    return db.from('characters').where('id', id);
  },
  insertCharacter(db, newCharacter) {
    return db.insert(newCharacter).into('characters').returning('*')
      .then(([character]) => character)
      .then(character => this.getCharacterById(db, character.id));
  },
  updateCharacter(db, character, id) {
    return db('characters').where({id}).update(character);
  }
};

module.exports = CharacterService;