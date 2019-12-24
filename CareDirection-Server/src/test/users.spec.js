const should = require('should')
const request = require('supertest');
const app = require('../app')

describe('GET /users', () => {
    describe("성공", () => {
        it('GET /users API test code" ', (done) => {
            request(app) // server를 자동으로 실행시킴
                .get('/users')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    // err -> err, success -> res.body
                    console.log(res.body)
                    // 여기 이제 응답값을 검증하는 코드가 들어감
                    res.body.should.be.an.instanceOf(Object)
                    res.body.data.forEach(user => {
                        user.should.be.have.property("name")
                    })
                    done() // 비동기로 동작하기 때문에, 요청이 완료된 시점을 mocha는 모른다.
                    // it의 done 함수를 통해 요청완료를 알려준다.(자동으로 mocha가 넣어줌)
                }) // 여기서 응답을 받게됨. 비동기
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
    describe("실패", () => {
        it('limit이 정수가 아니면 400을 응답한다', done => {
            request(app)
                .get('./users?limit=two')
                .expect(400)
                .end(done)
        })

    })

})
