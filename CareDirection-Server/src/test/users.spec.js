const should = require('should')
const request = require('supertest')
const app = require('../app')

describe('GET /users', () => {
  describe('성공', () => {
    it('GET /users API test code" ', (done) => {
      request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.body.should.be.an.instanceOf(Object)
          res.body.data.forEach(user => {
            user.should.be.have.property('name')
          })
          done()
        })
    })
    it('최대 limit 갯수만큼 응답한다.', (done) => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.data.should.have.lengthOf(2)
          done()
        })
    })
  })
  describe('실패', () => {
    it('limit이 정수가 아니면 400을 응답한다', done => {
      request(app)
        .get('./users?limit=two')
        .expect(400)
        .end(done)
    })
  })
})
