// import  bcrypt  from 'bcrypt';
// import { expect } from 'chai';
// import sinon from 'sinon';
// import { generateToken, extractToken } from '../src/middlewares/jwt_config';
// import jwt from 'jsonwebtoken';
// import express from "express"
// import { comparePassword, hashPassword } from '../src/helpers/hashPassword';

// describe('Middleware Tests', () => {
//   describe('generateToken', () => {
//     it('should generate a valid JWT token', () => {
//       const data = { _id: '123', name: 'testUser' ,email:"testEmail"};
//     //   const calc = new generateToken();
//       const token = generateToken(data);
//       expect(token).to.be.a('string');
//     });
//   });

//   describe('extractToken', () => {
//     it('should extract token from headers and set userInfo on request object', async () => {
//       const testToken:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU4MmE0ZGE0ZmNkZGU1ZjVhNDI4MTIiLCJuYW1lIjoiUnVyZW1hIFBhdWwiLCJlbWFpbCI6InJ1cmVtYUBnbWFpbC5jb20iLCJpYXQiOjE3MDk3MTQwNDMsImV4cCI6MTcwOTc0NDA0M30.art-72bL-CBdLkyW8SYL_z_ngo8fcMiTTqXT1J4-J8U"
//       const NAMESPACE = 'USER-AUTH'  
//       const req = {
//         headers: {
//           authorization: `Bearer ${testToken}`,
//         },
//         userInfo: {} as any,
//       };
//       const res = {} as any;
//       const next = sinon.stub();

//       const verifyStub = sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
//         (callback as any)(null, { _id: '123' });
//       });

//       await extractToken((req as any), res, next);

//       expect(req.userInfo).to.deep.equal({ _Id: '123', name:'testUser', email:"testEmail" });
//       expect(next.calledOnce).to.be.true;

//       verifyStub.restore();
//     });

//     it('should handle missing token', async () => {
//       const req = {
//         headers: {},
//       };
//       const res = {
//         status: sinon.stub().returnsThis(),
//         json: sinon.stub(),
//       } as any;
//       const next = sinon.stub();

//       await extractToken((req as any), res, next);

//       expect(res.status.calledOnceWith(401)).to.be.true;
//       expect(res.json.calledOnceWith({ message: 'no access token found' })).to.be.true;
//       expect(next.called).to.be.false;
//     });

//     it('should handle invalid token', async () => {
//         const expiredToken = jwt.sign(
//             { id: "65e62cd126440041715a5245" },
//             "USER_AUTH" || "",
//             { expiresIn: 0 }
//           );

//       const req = {
//         headers: {
//           authorization: `Bearer ${expiredToken}`,
//         },
//       };
//       const res = {
//         status: sinon.stub().returnsThis(),
//         json: sinon.stub(),
//       } as any;
//       const next = sinon.stub();

//       const verifyStub = sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
//         (callback as any)(new Error('Invalid token'));
//       });

//       await extractToken((req as any), res, next);

//       expect(res.status.calledOnceWith(401)).to.be.true;
//       expect(res.json.calledOnceWith({ message: 'Invalid token' })).to.be.true;
//       expect(next.called).to.be.false;

//       verifyStub.restore();
//     });

//     it('should handle internal server error', async () => {
//       const req = {
//         headers: {
//           authorization: 'Bearer testToken',
//         },
//       };
//       const res = {
//         status: sinon.stub().returnsThis(),
//         json: sinon.stub(),
//       } as any;
//       const next = sinon.stub();

//       const verifyStub = sinon.stub(jwt, 'verify').throws(new Error('Internal server error'));

//       await extractToken((req as any), res, next);

//       expect(res.status.calledOnceWith(500)).to.be.true;
//       expect(res.json.calledOnceWith({ message: 'Internal server error' })).to.be.true;
//       expect(next.called).to.be.false;

//       verifyStub.restore();
//     });
//   });
// });

// describe("Test hash Password Password", async() => {
//     let password = "user123"
//     const hashed = await hashPassword(password)
//     it("Hashes a password", () => {
//         expect(hashed).to.not.equal(password)
//         expect(bcrypt.compareSync(password, hashed)).to.be.false
//         expect(hashed).to.be.a.string
//     })
//     it("Compares hash password", async () => {
//         let password = "user123"
//         const result = await comparePassword(password, hashed)
//         expect(result).to.equal(true)
//         expect(result).to.be.a("boolean")
//     })
// })