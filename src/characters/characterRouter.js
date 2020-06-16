const express = require('express');
const CharacterService = require('./characterService')
const characterRouter = express.Router();
const jsonParser = express.json();

const serializeAllCharacters = characters => ({
  characterName: characters.characterName,
  strength: characters.strength,
  dexterity: characters.dexterity
});

//for getting all characters
characterRouter.route('/characters')
.get(async (req, res, next) => {
  try {
    const db = req.app.get('db');
    let characters = await CharacterService.getAllCharacters(db);
    res.json(characters);
  } catch(err) {
    next(err);
  }
})
.post(jsonParser, (req, res, next) => {
  const {characterName, strength, dexterity, constitution, intelligence, charisma, wisdom, characterClass, characterLevel, hitDie, experience, attackValue, savingThrow, slots, miracles, groups, raises, gold, encumbrance, movement, armorClass, initiativeBonus, languages} = req.body;
  //class is protected keyword? cannot use in newCharacter object constructor
  const newCharacter = {
    characterName, strength, dexterity, constitution, intelligence, charisma, wisdom, characterClass, characterLevel, hitDie, experience, attackValue, savingThrow, slots, miracles, groups, raises, gold, encumbrance, movement, armorClass, initiativeBonus, languages
  };
  const requiredFields = ['characterName', 'strength', 'dexterity', 'constitution', 'intelligence', 'charisma', 'wisdom', 'characterClass', 'characterLevel', 'hitDie', 'experience', 'attackValue', 'savingThrow', 'slots', 'miracles', 'groups', 'raises', 'gold', 'encumbrance', 'movement', 'armorClass', 'initiativeBonus', 'languages'];
  //error validation
  for (const key of requiredFields) {
    if(!(key in req.body)){
      return res.status(400).json({error: `Missing ${key} in request body`})
    }
  }
  const db = req.app.get('db');
  CharacterService.insertCharacter(db, newCharacter);
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