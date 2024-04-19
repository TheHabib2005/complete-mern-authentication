import express from "express"
import newUser from "./newUser.js";
import handleRegister from "./user.register.js";
import handleLogin from "./user.login.js";
import verifyEmail from "./user.verify-email.js";
import getUserdetails from "./user.user-details.js";

const userRouter = express.Router();

userRouter.get('/new-user', newUser);
userRouter.post('/register', handleRegister);
userRouter.post('/login', handleLogin);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/user-details', getUserdetails);






export default userRouter