const ItemService = {
  getAllItems(db) {
    return db.from('items')
      .select('*')
  },
  getItemById(db, id) {
    return db.from('items').where('id', id);
  },
  insertItem(db, newItem) {
    return db.insert(newItem).into('items').returning('*')
      .then(([item]) => item)
      .then(item => this.getItemById(db, item.id))
  },
  updateItem(db, item, id) {
    return db('items').where({id}).update(item);
  }
};

module.exports = ItemService;