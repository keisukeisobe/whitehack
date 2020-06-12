const CharacterService = {
  getAllCharacters(db) {
    return db.from('characters')
      .select('*')
  },
  getCharacterById(db, id) {
    return db.from('characters').where('id', id);
  }
};

module.exports = CharacterService;