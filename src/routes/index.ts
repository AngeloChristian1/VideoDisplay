import express from 'express'
import authentication from './authentication'
import users from './users'
import todos from './todos';
import messages from './messages';
import blogs from './blogs';

const router = express.Router();

export default(): express.Router =>{
authentication(router)
users(router)
todos(router)
blogs(router)
messages(router)

return router;
} 