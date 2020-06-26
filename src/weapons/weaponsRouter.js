const express = require('express');
const weaponsRouter = express.Router();
const {requireAuth} = require('../middleware/jwt-auth');
const WeaponsService = require('./weaponsService');
const jsonParser = express.json();

weaponsRouter.route('/weapons')
  //uncomment to add authentication
  //.all(requireAuth)
  .get(async (req, res, next) => {
    try {
      const db = req.app.get('db');
      let weapons = await WeaponsService.getAllWeapons(db);
      res.json(weapons);
    } catch(err) {
      next(err);
    }
  })
  .post(jsonParser, (req, res, next) => {
    const {name, damageDie, damageBonus, special, range, fireRate, cost, weight, description} = req.body;
    const newWeapons = {name, damageDie, damageBonus, special, range, fireRate, cost, weight, description};
    const requiredFields = ['name', 'damageDie', 'damageBonus', 'special', 'range', 'fireRate', 'cost', 'weight', 'description'];
    //error validation
    for (const key of requiredFields) {
      if(!(key in req.body)){
        return res.status(400).json({error: `Missing ${key} in request body`});
      }
    }
    const db = req.app.get('db');
    WeaponsService.insertWeapon(db, newWeapons)
      .then(item => {
        res.json(item);
      })
      .catch(next);
  });

weaponsRouter.route('/weapons/:item_id')
  .get(async (req, res, next) => {
    try {
      const db = req.app.get('db');
      let item = await WeaponsService.getWeaponsById(db, req.params.item_id);
      if (item != null){
        res.json(item[0]);
      } else {
        return res.status(404).json({error: 'Weapons does not exist'});
      }
    } catch(err) {
      next(err);
    }
  })
  .patch(jsonParser, (req, res, next) => {
    const {id, name, description, cost, weight} = req.body;
    const item = {id, name, description, cost, weight};
    //error validation
    for (const key of requiredFields) {
      if(!(key in req.body)){
        return res.status(400).json({error: `Missing ${key} in request body`});
      }
    }
    const db = req.app.get('db');
    WeaponsService.updateWeapons(db, item, item.id)
      .then(item => {
        res.json(item);
      })
      .catch(next);
  });

module.exports = weaponsRouter;