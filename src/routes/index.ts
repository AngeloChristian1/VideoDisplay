import express from 'express'
import authentication from './authentication'
import users from './users'
import todos from './todos';
import messages from './messages';
import blogs from './blogs';
import comments from './comments';
import likes from './likes';

const router = express.Router();

export default(): express.Router =>{

  authentication(router);
  users(router);
  todos(router);
  blogs(router);
  messages(router);
  comments(router);
  likes(router);

  return router;
} 