const test = require('tape');
const request = require('supertest');
const app = require('../src/app');

test('Tape is working', (t) => {
  t.equal(1, 1, 'Tape is working');
  t.end();
});

test('All routs should return the expected result', t => {
  request(app)
  .get('/home')
  .expect(200)
  .end((err, res) => {
    t.error(err);
    t.equal(res.statusCode, 200, 'statusCode is 200');
    t.end();
  });
});

test('Should return a message', t => {
  request(app)
  .get('/signbtn')
  .expect(200)
  .end((err, res) => {
    t.error(err);
    console.log(res.text)
    t.deepEqual(res.text.includes('You already have an account'), true,  'send to the user message: You already have an account')
    t.end();
  });
});

test('/login', t => {
  request(app)
  .get('/login')
  .expect(200)
  .end((err, res) => {
    t.error(err);
    t.equal(res.statusCode, 200, 'login');
    t.end();
  });
});

test('/details', t => {
  request(app)
  .get('/details')
  .expect(200)
  .end((err, res) => {
    t.error(err);
    t.equal(res.statusCode, 200, 'details');
    t.end();
  });
});
