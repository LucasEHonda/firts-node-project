import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListSendComplimentsController } from "./controllers/ListSendComplimentsController";
import { ListReceiveComplimentsController } from "./controllers/ListReceiveComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticated";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersControllers } from "./controllers/ListUsersControllers";

const router = Router();

// USERS
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const listUsersControllers = new ListUsersControllers();

// COMPLIMENTS
const createComplimentController = new CreateComplimentController();
const listSendComplimentsController = new ListSendComplimentsController();
const listReceiveComplimentsController = new ListReceiveComplimentsController();

// TAGS
const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();


// // // //  ENDPOINTS

// USERS
router.post("/users", createUserController.handle);
router.get("/users", ensureAuthenticate, listUsersControllers.handle);

// TAGS
router.post("/tags", ensureAuthenticate, ensureAdmin, createTagController.handle);
router.get("/tags", ensureAuthenticate, listTagsController.handle)

// LOGIN
router.post("/login", authenticateUserController.handle);

// COMPLIMENTS
router.post("/compliments", ensureAuthenticate, createComplimentController.handle);
router.get("/users/compliments/send", ensureAuthenticate, listSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticate, listReceiveComplimentsController.handle);


export { router };