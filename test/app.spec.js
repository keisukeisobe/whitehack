const app = require('../src/app');
const { expect } = require('chai');
const knex = require('knex');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!');
  });
});

describe('Charater Endpoints', function() {
  let db = knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  });
  app.set('db', db);

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db('characters').truncate());

  this.afterEach('cleanup', () => db('characters').truncate());
});