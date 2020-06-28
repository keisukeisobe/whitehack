const app = require('../src/app');
const { expect } = require('chai');
const knex = require('knex');

describe('App', () => {
  it('GET / responds with 200 containing ', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'App successfully loaded!');
  });
});

describe('Character Endpoints', function() {
  let db = knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  });
  app.set('db', db);

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db('characters').truncate());

  this.afterEach('cleanup', () => db('characters').truncate());

  
});