import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import {app} from '../src/index'; // Replace this with the path to your Express app file
import { TodoModel } from 'schema/todos'; // Assuming you have a Todo model

chai.use(chaiHttp);
const expect = chai.expect;
describe("API Testing", ()=>{
  should()
  // test welcome database
  it("Test Welcome API", (done)=>{
      chai.request(app)
      .get('/welcome')
      .end((err, res)=>{
          // res.should.have.status(200)
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.be.equal("Welcome to my API");
          done()
      })

  })
})
describe('Todo API', () => {

  describe('POST /addTodo', () => {
    it('should add a new todo', async () => {
      const res = await chai
        .request(app)
        .post('/todos/add')
        .send({ title: 'Test Todo', content: 'Test Content', isDone: false, date:"27/02/2024" });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('title', 'Test Todo');
      expect(res.body).to.have.property('content', 'Test Content');
      expect(res.body).to.have.property('isDone', false);
      // Add more assertions as needed
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await chai
        .request(app)
        .post('/todos/add')
        .send({ title: 'Incomplete Todo' });
      expect(res).to.have.status(400);
      // Add more assertions as needed
    });

    // Add more test cases for other scenarios

  });

  
  describe("GET all todos", ()=>{
    it("Should return 200 if all todos are returned", (done)=>{
      chai.request(app)
      .get('/todos')
      .end((err, res)=>{
          // let mockedUserResponse = [{title:"Going to gym", content:"At 15:00"},{title:"Sleeping", content:"At 15:00"}]
          // nock(baseUrl).get(`/todos`).reply(200, mockedUserResponse)
          
          expect(res).to.have.status(200);
          // expect(res.body.message).to.be.equal("Welcome to my API");
          expect(res.body).to.be.a("array");
          done()
      })

  })
  //   it("Should return 400 if error occured", (done)=>{
  //     chai.request(app)
  //     .get('/todos')
  //     .end((err, res)=>{
  //         expect(err).to.have.status(400);
  //         expect(err).to.be.a("array");
  //         done()
  //     })
  // })
  })

  // Update test cases for other endpoints
  
  describe("Update Todo", ()=>{
    it("Should return 200 todo updated", (done)=>{
      let id = '65e043fc9d97a8da76cb8dc2'
      const todoPayload = {
        title: "Going to gym Edited",
        content: "At 15:00 edited",
        isDone:true,
      };
      chai.request(app)
      .patch(`/todos/update/${id}`).
      send(todoPayload)
      .end((err, res)=>{
          // let mockedUserResponse = [{title:"Going to gym", content:"At 15:00"},{title:"Sleeping", content:"At 15:00"}]
          // nock(baseUrl).get(`/todos`).reply(200, mockedUserResponse)
          
          expect(res).to.have.status(200);
          // expect(res.body.message).to.be.equal("Welcome to my API");
          expect(res.body).to.be.a("object");
          done()
      })

  })
    it("Should return 400 if Filds are not full", (done)=>{
      let id = '65e043fc9d97a8da76cb8dc2'
      const todoPayload = {
        title: "Going to gym Edited",
        content: "At 15:00 edited",
      };
      chai.request(app)
      .patch(`/todos/update/${id}`).
      send(todoPayload)
      .end((err, res)=>{
          expect(res).to.have.status(400);
          // expect(res.body.message).to.be.equal("Welcome to my API");
          expect(res.body).to.be.a("object");
          done()
      })

  })
  })
});
