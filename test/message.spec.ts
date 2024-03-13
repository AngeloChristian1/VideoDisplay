import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { app } from './index.spec'; 
import { MessageModel } from '../src/schema/message'; 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Like', () => {

  describe('POST /addmessage', () => {
    it('should add a new message', async () => {
      const res = await chai
        .request(app)
        .post('/messages/add')
        .send({ title: 'Test message', content: 'Test Content', isDone: false, date:"27/02/2024" });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('blogId', 'Test message');
      expect(res.body).to.have.property('content', 'Test Content');

      // Add more assertions as needed
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await chai
        .request(app)
        .post('/messages/add')
        .send({ message: 'Incomplete message' });
      expect(res).to.have.status(400);
      // Add more assertions as needed
    });

    // Add more test cases for other scenarios

  });

  
  describe("GET all messages", ()=>{
    it("Should return 200 if all messages are returned", (done)=>{
      chai.request(app)
      .get('/messages')
      .end((err, res)=>{
          // let mockedUserResponse = [{title:"Going to gym", content:"At 15:00"},{title:"Sleeping", content:"At 15:00"}]
          // nock(baseUrl).get(`/messages`).reply(200, mockedUserResponse)
          
          expect(res).to.have.status(200);
          // expect(res.body.message).to.be.equal("Welcome to my API");
          expect(res.body).to.be.a("array");
          done()
      })

  })
  //   it("Should return 400 if error occured", (done)=>{
  //     chai.request(app)
  //     .get('/messages')
  //     .end((err, res)=>{
  //         expect(err).to.have.status(400);
  //         expect(err).to.be.a("array");
  //         done()
  //     })
  // })
  })

  // Update test cases for other endpoints
  
  describe("Update message", ()=>{
    it("Should return 200 message updated", (done)=>{
      let id = '65e043fc9d97a8da76cb8dc2'
      const messagePayload = {
        title: "Going to gym Edited",
        content: "At 15:00 edited",
        isDone:true,
      };
      chai.request(app)
      .patch(`/messages/update/${id}`).
      send(messagePayload)
      .end((err, res)=>{
          // let mockedUserResponse = [{title:"Going to gym", content:"At 15:00"},{title:"Sleeping", content:"At 15:00"}]
          // nock(baseUrl).get(`/messages`).reply(200, mockedUserResponse)
          
          expect(res).to.have.status(200);
          // expect(res.body.message).to.be.equal("Welcome to my API");
          expect(res.body).to.be.a("object");
          done()
      })

  })
    it("Should return 400 if Filds are not full", (done)=>{
      let id = '65e043fc9d97a8da76cb8dc2'
      const messagePayload = {
        title: "Going to gym Edited",
        content: "At 15:00 edited",
      };
      chai.request(app)
      .patch(`/messages/update/${id}`).
      send(messagePayload)
      .end((err, res)=>{
          expect(res).to.have.status(400);
          // expect(res.body.message).to.be.equal("Welcome to my API");
          expect(res.body).to.be.a("object");
          done()
      })

  })
  })
});
