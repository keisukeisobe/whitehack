const CharacterService = {
  getAllCharacters(db) {
    return db.from('characters')
      .select('*')
  },
  getCharacterById(db, id) {
    return db.from('characters').where('id', id);
  },
  insertCharacter(db, newCharacter) {
    return db.insert(newCharacter).into('characters').returning('*')
      .then(([character]) => character)
      .then(character => this.getCharacterById(db, character.id))
  }
};

module.exports = CharacterService;