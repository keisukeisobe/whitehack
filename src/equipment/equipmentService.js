const EquipmentService = {
  getAllEquipment(db) {
    return db.from('equipment').select('*');
  },
  getEquipmentId(db, itemid){
    //return db.from('equipment').select('*').where('id');
  },
  insertEquipment(db, newEquipment) {
    return db.insert(newEquipment).into('equipment').returning('*');
  },
};

module.exports = EquipmentService;
