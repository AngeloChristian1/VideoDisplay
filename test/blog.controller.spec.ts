import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import * as blogsController from '../src/controllers/blogs'; // Import your controllers
import { BlogModel } from '../src/schema/blogs';

describe('Blog Controllers', () => {
  describe('addBlog', () => {
    it('should add a new blog', async () => {
      let req = { body:
         { title: 'Test Blog', content: 'Test Content', subtitle:"Blog subtitle", timeToRead:"40", poster:"https://res.cloudinary.com/dms2akwoq/image/upload/v1709553916/my-blog/ghgmv3vgavb05yjs126f.jpg", category:"category" } ,
        } as Request;
    //    req = { files: [
    //     {
    //       fieldname: 'poster',
    //       originalname: 'blog3.jpeg',
    //       encoding: '7bit',
    //       mimetype: 'image/jpeg',
    //       buffer: `<Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 02 00 00 01 00 01 00 00 ff db 00 43 00 06 04 05 06 05 04 06 06 05 06 07 07 06 08 0a 10 0a 0a 09 09 0a 14 0e 0f 0c ... 136731 more bytes>`,
    //       size: 136781
    //     }
    //   ] } as Request;
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      } as unknown as Response;

      const saveStub = sinon.stub(BlogModel.prototype, 'save').resolves({ title: 'Test Blog', content: 'Test Content' });

      await blogsController.addBlog((req as any), res);

      expect(res.status).to.be.equal(200);
    //   expect(res.send.calledWith({ status: 'success', data: { title: 'Test Blog', content: 'Test Content' } })).to.be.true;

      saveStub.restore();
    });

    it('should return 400 if required fields are missing', async () => {
      const req = { body: { title: 'Incomplete Blog' } } as Request;
      const res = {
        status: sinon.stub().returnsThis(),
        sendStatus: sinon.stub(),
      } as unknown as Response;

      await blogsController.addBlog((req as any), res);  
      expect(res.status).to.be.equal(400);
    //   expect(res.sendStatus.called).to.be.true;
    });

    // Add more test cases for other scenarios

  });

  // Add similar tests for other controller functions like getAllBlogs, getOneBlogById, deleteBlog, updateBlog, etc.
});
