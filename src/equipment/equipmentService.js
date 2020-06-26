const EquipmentService = {
  getAllEquipment(db) {
    return db.from('equipment').select('*');
  },
  insertEquipment(db, newEquipment) {
    return db.insert(newEquipment).into('equipment').returning('*');
  },
};

module.exports = EquipmentService;
