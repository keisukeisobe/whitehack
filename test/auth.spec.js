const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const jwt = require('jsonwebtoken');
const { expect } = require('chai');

describe('Auth login endpoints', function() {
  this.timeout(5000);
  let db;
  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[0];

  before('make new knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('POST api/auth/login', () => {
    beforeEach('insert users', () => {
      helpers.seedUsers(db, testUsers);
    });
    it('Responds with 200 and JWT Auth token using secret when valid credentials', () => {
      const userValidCreds = {
        username: testUser.username,
        password: testUser.password
      };
      const expectedToken = jwt.sign({user_id: testUser.login_id}, process.env.JWT_SECRET, {subject: testUser.username, algorithm: 'HS256'});
      const expectedReturn = {authToken: expectedToken, user_id: testUser.login_id};
      return supertest(app)
        .post('/api/auth/login')
        .send(userValidCreds)
        .expect(200)
        .expect(res => {
          const { authToken } = res.body;
          const token = jwt.decode(authToken);
          return expect(token.user_id).to.equal(1);
        });
    });
    const requiredFields = ['username', 'password'];
    requiredFields.forEach(field => {
      const loginAttemptBody = {
        username: testUser.username,
        password: testUsers.password
      };
      it(`Responds with 400 when ${field} is missing`, () => {
        delete loginAttemptBody[field];
        return supertest(app)
          .post('/api/auth/login')
          .send(loginAttemptBody)
          .expect(400, {error: `Missing ${field} in request body` });
      });
    });
    it('Responds with 400 "Incorrect username or password" when bad username', () => {
      const userInvalidUsername = {username: 'bad', password: 'exists'};
      return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidUsername)
        .expect(400, {error: 'Incorrect username or password'});
    });
    it('Responds with 400 "Incorrect username or password" when bad password', () => {
      const userInvalidPassword = {username: testUser.username, password: 'wrong'};
      return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidPassword)
        .expect(400, {error: 'Incorrect username or password'});
    });
  });
});
