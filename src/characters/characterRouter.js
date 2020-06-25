const express = require('express');
const CharacterService = require('./characterService')
const characterRouter = express.Router();
const {requireAuth} = require('../middleware/jwt-auth');
const jsonParser = express.json();

//for getting all characters
characterRouter.route('/characters')
  //uncomment to add authentication
  //.all(requireAuth)
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
    const {charactername, strength, dexterity, constitution, intelligence, charisma, wisdom, characterclass, characterlevel, hitdie, experience, attackvalue, savingthrow, slots, miracles, groups, raises, gold, encumbrance, movement, armorclass, initiativebonus, languages} = req.body;
    //class is protected keyword? cannot use in newCharacter object constructor
    const newCharacter = {
      charactername, strength, dexterity, constitution, intelligence, charisma, wisdom, characterclass, characterlevel, hitdie, experience, attackvalue, savingthrow, slots, miracles, groups, raises, gold, encumbrance, movement, armorclass, initiativebonus, languages
    };
    const requiredFields = ['charactername', 'strength', 'dexterity', 'constitution', 'intelligence', 'charisma', 'wisdom', 'characterclass', 'characterlevel', 'hitdie', 'experience', 'attackvalue', 'savingthrow', 'slots', 'miracles', 'groups', 'raises', 'gold', 'encumbrance', 'movement', 'armorclass', 'initiativebonus', 'languages'];
    //error validation
    for (const key of requiredFields) {
      if(!(key in req.body)){
        return res.status(400).json({error: `Missing ${key} in request body`})
      }
    }
    const db = req.app.get('db');
    CharacterService.insertCharacter(db, newCharacter)
      .then(character => {
        res.json(character);
      })
      .catch(next);
  });

characterRouter.route('/:character_id')
  .get(async (req, res, next) => {
    try {
      const db = req.app.get('db');
      let character = await CharacterService.getCharacterById(db, req.params.character_id);
      if (character != null){
        res.json(character[0]);
      } else {
        return res.status(404).json({error: 'Character does not exist'});
      }
    } catch(err) {
      next(err);
    }
  })
  .patch(jsonParser, (req, res, next) => {
    const {charactername, strength, dexterity, constitution, intelligence, charisma, wisdom, characterclass, characterlevel, hitdie, experience, attackvalue, savingthrow, slots, miracles, groups, raises, gold, encumbrance, movement, armorclass, initiativebonus, languages} = req.body;
    const character = {
      charactername, strength, dexterity, constitution, intelligence, charisma, wisdom, characterclass, characterlevel, hitdie, experience, attackvalue, savingthrow, slots, miracles, groups, raises, gold, encumbrance, movement, armorclass, initiativebonus, languages
    };
    //error validation
    for (const key of requiredFields) {
      if(!(key in req.body)){
        return res.status(400).json({error: `Missing ${key} in request body`})
      }
    }
    const db = req.app.get('db');
    CharacterService.updateCharacter(db, character, character.id)
      .then(character => {
        res.json(character);
      })
      .catch(next);
  });

module.exports = characterRouter;