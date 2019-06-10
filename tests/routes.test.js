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
    t.end();
  });
});

test('Should return a message', t => {
  request(app)
  .get('/signbtn')
  .expect(200)
  .expect('You alreday have an account')
  .end((err, res) => {
    t.error(err);
    t.end();
  });
});

// test('/login', t => {
//   request(app)
//   .get('/login')
//   .expect(200)
//   .expect()
// })
