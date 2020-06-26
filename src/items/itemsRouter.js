const express = require('express');
const itemsRouter = express.Router();
const {requireAuth} = require('../middleware/jwt-auth');
const ItemService = require('./itemsService');
const jsonParser = express.json();

//for getting all characters
itemsRouter.route('/items')
  //uncomment to add authentication
  //.all(requireAuth)
  .get(async (req, res, next) => {
    try {
      const db = req.app.get('db');
      let items = await ItemService.getAllCharacters(db);
      res.json(items);
    } catch(err) {
      next(err);
    }
  })
  .post(jsonParser, (req, res, next) => {
    const {name, description, cost, weight} = req.body;
    //class is protected keyword? cannot use in newCharacter object constructor
    const newItem = {name, description, cost, weight};
    const requiredFields = ['name', 'description', 'cost', 'weight'];
    //error validation
    for (const key of requiredFields) {
      if(!(key in req.body)){
        return res.status(400).json({error: `Missing ${key} in request body`});
      }
    }
    const db = req.app.get('db');
    ItemService.insertCharacter(db, newItem)
      .then(item => {
        res.json(item);
      })
      .catch(next);
  });

itemsRouter.route('/:item_id')
  .get(async (req, res, next) => {
    try {
      const db = req.app.get('db');
      let item = await ItemService.getItemById(db, req.params.item_id);
      if (item != null){
        res.json(item[0]);
      } else {
        return res.status(404).json({error: 'Item does not exist'});
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
    ItemService.updateItem(db, item, item.id)
      .then(item => {
        res.json(item);
      })
      .catch(next);
  });

module.exports = itemsRouter;