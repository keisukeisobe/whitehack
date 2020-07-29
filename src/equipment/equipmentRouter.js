const express = require("express");
const EquipmentService = require('./equipmentService.js');
const equipmentRouter = express.Router();
const { requireAuth } = require("../middleware/jwt-auth");
const jsonParser = express.json();

//for getting all equipment
equipmentRouter
  .route('/equipment')
  //uncomment to add authentication
  //.all(requireAuth)
  .get(async (req, res, next) => {
    try {
      const db = req.app.get('db');
      let equipment = await EquipmentService.getAllEquipment(db);
      res.json(equipment);
    } catch (err) {
      next(err);
    }
  });

equipmentRouter
.route('/equipid/:itemid')
//uncomment to add authentication
//.all(requireAuth)
.get(async (req, res, next) => {
  try {
    const db = req.app.get('db');
    let equipment = await EquipmentService.getEquipmentId(db, req.params.itemid);
    res.json(equipment);
  } catch (err) {
    next(err);
  }
});


module.exports = equipmentRouter;
