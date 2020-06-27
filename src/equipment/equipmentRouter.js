const express = require("express");
const EquipmentService = require("./equipmentService.js");
const equipmentRouter = express.Router();
const { requireAuth } = require("../middleware/jwt-auth");
const jsonParser = express.json();

//for getting all equipment
equipmentRouter
  .route("/equipment")
  //uncomment to add authentication
  //.all(requireAuth)
  .get(async (req, res, next) => {
    try {
      const db = req.app.get("db");
      let equipment = await EquipmentService.getAllEquipment(db);
      res.json(equipment);
    } catch (err) {
      next(err);
    }
  })

  .post(jsonParser, (req, res, next) => {
    const {
      id,
      name,
      armorclass,
      cost,
      weight,
      special,
      description,
    } = req.body;
    //class is protected keyword? cannot use in newCharacter object constructor
    const newEquipment = {
      id,
      name,
      armorclass,
      cost,
      weight,
      special,
      description,
    };
    const requiredFields = [
      "name",
      "armorclass",
      "cost",
      "weight",
      "description",
    ];
    //error validation
    for (const key of requiredFields) {
      if (!(key in req.body)) {
        return res
          .status(400)
          .json({ error: `Missing ${key} in request body` });
      }
    }
    const db = req.app.get("db");
    EquipmentService.insertEquipment(db, newEquipment)
      .then((newEquipment) => {
        res.json(newEquipment);
      })
      .catch(next);
  });

module.exports = equipmentRouter;
