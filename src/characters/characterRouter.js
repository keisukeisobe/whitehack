const express = require('express');
const CharacterService = require('./characterService')
const characterRouter = express.Router();

const serializeAllCharacters = characters => ({
  characterName: characters.characterName,
  strength: characters.strength,
  dexterity: characters.dexterity
});

//for getting new characters
characterRouter.get('/characters', async (req, res, next) => {
  try {
    const db = req.app.get('db');
    let characters = await CharacterService.getAllCharacters(db);
    res.json(characters);
  } catch(err) {
    next(err);
  }
});

characterRouter.get('/:character_id', async (req, res, next) => {
  try {
    const db = req.app.get('db');
    let character = await CharacterService.getCharacterById(db, req.params.character_id);
    console.log(character);
    if (character != null){
      res.json(character[0]);
    } else {
      return res.status(404).json({error: 'Character does not exist'});
    }
  } catch(err) {
    next(err);
  }
});

module.exports = characterRouter;