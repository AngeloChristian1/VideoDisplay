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
            content: "The Power of Prompts \n Prompt engineering has emerged as one of the most impactful innovations in artificial intelligence and software development in recent years. With the right prompts, chatbots like ChatGPT can now write code, generate content, answer questions, and even develop their own skills with little or no traditional programming required.\n This new capability is revolutionizing how software is built and how AI systems are created. Rather than needing to hand-code every function, developers can now use natural language prompts to get an AI assistant to generate functions, build interfaces, connect APIs, and more. The prompt essentially acts as the specification for what the developer wants the software or AI to do. \n Some experts argue prompt engineering will do to coding what GUIs and visual programming languages did - open up software development to a much wider audience. Rather than needing specialized coding skills, anyone can potentially 'program' an AI system with thoughtful prompts and some trial and error. \n Democratizing AI Development \n Prompt engineering also allows those outside the field of machine learning to build, train, and refine AI models. Using methodologies like 'chain of thought prompting,' normal users can guide chatbots into developing new skills, knowledge, and capabilities just through conversation and prompting. This helps overcome the steep learning curves previously required for AI training. \n The prompter essentially breaks down a complex task like building an image classifier into easier sub-tasks using natural language - much more intuitive for non-experts. This democratization of AI development brings more ideas and use cases to the field at a rapid pace. \n boundless possibilities, challenges around bias and ethics \n The Future of Prompts \n Many believe prompt engineering is still in its infancy, with massive room for improvement. As methods mature, prompts could get even more powerful and flexible while requiring less specialized knowledge. This would open endless possibilities for software automation and AI assistive capabilities. \n However, prompt-powered systems also come with risks if deployment outpaces proper validation. There are still many open questions around potential biases and limitations. Prompt engineering sits at the center of crucial debates today around AI ethics, transparency, and control. \n Getting prompts right certainly isn't easy. But despite the challenges, this technology feels like more than just a fad. All signs point to prompt programming becoming an essential skill for both software developers and AI researchers building the next generation of transformative tools. The prompt revolution has only just begun.",
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
      let id = '65e051feca01e0074418775f'
      const blogPayload = {
        poster: "https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fg4rvlnzbghppi5o073iw.png",
        title: "Prompt Engineering: The new age",
        subtitle: "How natural language will be the corefront of programming",
        category: "software Engineering",
        content: "The Power of Prompts \n Prompt engineering has emerged as one of the most impactful innovations in artificial intelligence and software development in recent years. With the right prompts, chatbots like ChatGPT can now write code, generate content, answer questions, and even develop their own skills with little or no traditional programming required.\n This new capability is revolutionizing how software is built and how AI systems are created. Rather than needing to hand-code every function, developers can now use natural language prompts to get an AI assistant to generate functions, build interfaces, connect APIs, and more. The prompt essentially acts as the specification for what the developer wants the software or AI to do. \n Some experts argue prompt engineering will do to coding what GUIs and visual programming languages did - open up software development to a much wider audience. Rather than needing specialized coding skills, anyone can potentially 'program' an AI system with thoughtful prompts and some trial and error. \n Democratizing AI Development \n Prompt engineering also allows those outside the field of machine learning to build, train, and refine AI models. Using methodologies like 'chain of thought prompting,' normal users can guide chatbots into developing new skills, knowledge, and capabilities just through conversation and prompting. This helps overcome the steep learning curves previously required for AI training. \n The prompter essentially breaks down a complex task like building an image classifier into easier sub-tasks using natural language - much more intuitive for non-experts. This democratization of AI development brings more ideas and use cases to the field at a rapid pace. \n boundless possibilities, challenges around bias and ethics \n The Future of Prompts \n Many believe prompt engineering is still in its infancy, with massive room for improvement. As methods mature, prompts could get even more powerful and flexible while requiring less specialized knowledge. This would open endless possibilities for software automation and AI assistive capabilities. \n However, prompt-powered systems also come with risks if deployment outpaces proper validation. There are still many open questions around potential biases and limitations. Prompt engineering sits at the center of crucial debates today around AI ethics, transparency, and control. \n Getting prompts right certainly isn't easy. But despite the challenges, this technology feels like more than just a fad. All signs point to prompt programming becoming an essential skill for both software developers and AI researchers building the next generation of transformative tools. The prompt revolution has only just begun.",
        timeToRead: "40",
        date: "27/02/2024",
        time: "20:24",
        editor:"Gatete Ishema Angelo Christian",
        views:[{}],
        likes: [{}],
        comments:[{user:"John", comment:"This is a great post",date:"20/02/2024",time:"20:24"}],
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
        let id = '65e051feca01e0074418775f'
        const blogPayload = {
          subtitle: "How natural language will be the corefront of programming",
          category: "software Engineering",
          content: "The Power of Prompts \n Prompt engineering has emerged as one of the most impactful innovations in artificial intelligence and software development in recent years. With the right prompts, chatbots like ChatGPT can now write code, generate content, answer questions, and even develop their own skills with little or no traditional programming required.\n This new capability is revolutionizing how software is built and how AI systems are created. Rather than needing to hand-code every function, developers can now use natural language prompts to get an AI assistant to generate functions, build interfaces, connect APIs, and more. The prompt essentially acts as the specification for what the developer wants the software or AI to do. \n Some experts argue prompt engineering will do to coding what GUIs and visual programming languages did - open up software development to a much wider audience. Rather than needing specialized coding skills, anyone can potentially 'program' an AI system with thoughtful prompts and some trial and error. \n Democratizing AI Development \n Prompt engineering also allows those outside the field of machine learning to build, train, and refine AI models. Using methodologies like 'chain of thought prompting,' normal users can guide chatbots into developing new skills, knowledge, and capabilities just through conversation and prompting. This helps overcome the steep learning curves previously required for AI training. \n The prompter essentially breaks down a complex task like building an image classifier into easier sub-tasks using natural language - much more intuitive for non-experts. This democratization of AI development brings more ideas and use cases to the field at a rapid pace. \n boundless possibilities, challenges around bias and ethics \n The Future of Prompts \n Many believe prompt engineering is still in its infancy, with massive room for improvement. As methods mature, prompts could get even more powerful and flexible while requiring less specialized knowledge. This would open endless possibilities for software automation and AI assistive capabilities. \n However, prompt-powered systems also come with risks if deployment outpaces proper validation. There are still many open questions around potential biases and limitations. Prompt engineering sits at the center of crucial debates today around AI ethics, transparency, and control. \n Getting prompts right certainly isn't easy. But despite the challenges, this technology feels like more than just a fad. All signs point to prompt programming becoming an essential skill for both software developers and AI researchers building the next generation of transformative tools. The prompt revolution has only just begun.",
          timeToRead: "40",
          date: "27/02/2024",
          time: "20:24",
          editor:"Gatete Ishema Angelo Christian",
          views:[{}],
          likes: [{}],
          comments:[{user:"John", comment:"This is a great post",date:"20/02/2024",time:"20:24"}],
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
  })
});
