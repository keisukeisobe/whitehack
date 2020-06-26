const WeaponsService = {
  getAllWeapons(db) {
    return db.from("weapons").select("*");
  },
  insertWeapon(db, newWeapon) {
    return db.insert(newWeapon).into("weapons").returning("*");
  },
};

module.exports = WeaponsService;
