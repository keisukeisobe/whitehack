const EquipmentService = {
  getAllEquipment(db) {
    return db.from("equipment").select("*");
  },
  getEquip(db, equip_id) {
    return db.from("equipment").select("*").where("id", equip_id);
  },
  insertEquipment(db, newEquipment) {
    return db.insert(newEquipment).into("equipment").returning("*");
  },
};

module.exports = EquipmentService;
