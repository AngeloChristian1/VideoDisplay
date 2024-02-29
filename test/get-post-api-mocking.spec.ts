import chai from "chai";
import chaiHttp from "chai-http";
import { expect, should } from "chai";
import "../src/index"
import {app} from "../src/index"
import { TodoModel } from "schema/todos";
import nock from "nock";

chai.use(chaiHttp)

// beforeEach(()=>{
//     console.log("Before hook");
// })
const baseUrl = `http://localhost:8080`
