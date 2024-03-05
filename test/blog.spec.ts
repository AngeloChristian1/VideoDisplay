import { BlogModel } from './../src/schema/blogs';
import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import {app} from '../src/index'; 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Blog API Testing', () => {

  describe('POST /addBlog', () => {
    it('should add a new blog', async () => {
        const params = {
            poster: "Test Image",
            title: "Test Title",
            subtitle: "How natural language will be the corefront of programming",
            category: "software Engineering",
            content: "The Power of Prompts \n Prompt engineering has emerged as one of the most impactful innovations in artificialThe prompt revolution has only just begun.",
            timeToRead: "40",
            date: "27/02/2024",
            time: "20:24",
            editor:"Gatete Ishema Angelo Christian",
            views:[{}],
            likes: [{}],
            comments:[{}]
        }
      const res = await chai
        .request(app)
        .post('/blogs/add')
        .send(params);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status', 'success');

    });

    it('should return 400 if required fields are missing', async () => {
      const res = await chai
        .request(app)
        .post('/blogs/add')
        .send({ title: 'Incomplete Todo' });
      expect(res).to.have.status(400);
    });

    // Add more test cases for other scenarios

  });

  
  describe("GET all todos", ()=>{
    it("Should return 200 if all blogs are returned", (done)=>{
      chai.request(app)
      .get('/blogs')
      .end((err, res)=>{
          // let mockedUserResponse = [{title:"Going to gym", content:"At 15:00"},{title:"Sleeping", content:"At 15:00"}]
          // nock(baseUrl).get(`/blogs`).reply(200, mockedUserResponse)
          
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("array");
          done()
      })

  })
  //   it("Should return 400 if error occured", (done)=>{
  //     chai.request(app)
  //     .get('/blogs')
  //     .end((err, res)=>{
  //         expect(err).to.have.status(400);
  //         expect(err).to.be.a("array");
  //         done()
  //     })
  // })
  })

  // Update test cases for other endpoints
  
  describe("Update Blog", ()=>{
    it("Should return 200 blog updated", (done)=>{
      let id = '65e19ced07daefd2edb01d58'
      const blogPayload = {
        poster: "https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fg4rvlnzbghppi5o073iw.png",
        title: "Prompt Engineering: The new age",
        subtitle: "How natural language will be the corefront of programming",
        category: "software Engineering",
        content: "The Power of Prompts \n Prompt engineering has emerged as one of the most impactful innovations in artificial intelligence and software development in recent years. With the right prompts, The prompt revolution has only just begun.",
        timeToRead: "40",
    }
      chai.request(app)
      .patch(`/blogs/update/${id}`).
      send(blogPayload)
      .end((err, res)=>{
          // let mockedUserResponse = [{title:"Going to gym", content:"At 15:00"},{title:"Sleeping", content:"At 15:00"}]
          // nock(baseUrl).get(`/blogs`).reply(200, mockedUserResponse)
          
          expect(res).to.have.status(200);
          // expect(res.body.message).to.be.equal("Welcome to my API");
          expect(res.body).to.be.a("object");
          done()
      })

  })
    it("Should return 400 if Filds are not full", (done)=>{
        let id = '65e19ced07daefd2edb01d58'
        const blogPayload = {
          subtitle: "How natural language will be the corefront of programming",
          category: "software Engineering",
          content: "The Power of Prompts \n Prompt engineering has emerged as one of the most impactful innovationse AI models. Getting prompts right certainly isn't easy. But despite the challenges, this technology feels like more than just a fad. All signs point to prompt programming becoming an essential skill for both software developers and AI researchers building the next generation of transformative tools. The prompt revolution has only just begun.",
          timeToRead: "40",
      }
      chai.request(app)
      .patch(`/blogs/update/${id}`).
      send(blogPayload)
      .end((err, res)=>{
          expect(res).to.have.status(400);
          // expect(res.body.message).to.be.equal("Welcome to my API");
          expect(res.body).to.be.a("object");
          done()
      })

  })
    it("Should return 404 cant find blog", (done)=>{
        let id = '65e051feca01e0074418775f'
        const blogPayload = {
          subtitle: "How natural language will be the corefront of programming",
          category: "software Engineering",
          content: "The Power of Prompts \n Prompt engineering has emerged as one of the most impactful innovations in artificial intelligence and software development in recent years. With the right prompts.",
          timeToRead: "40",
      }
      chai.request(app)
      .patch(`/blogs/${id}`).
      send(blogPayload)
      .end((err, res)=>{
          expect(res).to.have.status(404);
          // expect(res.body.message).to.be.equal("Welcome to my API");
          expect(res.body).to.be.a("object");
          done()
      })

  })
  })
});
