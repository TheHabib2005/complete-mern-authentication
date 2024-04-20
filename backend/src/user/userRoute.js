import express from "express"
import multer from "multer";
import newUser from "./newUser.js";
import handleRegister from "./user.register.js";
import handleLogin from "./user.login.js";
import verifyEmail from "./user.verify-email.js";
import getUserdetails from "./user.user-details.js";
import handleProfileUpload from "./upload-profile-image.js";
import profileStorage from "../middleware/multer/uploadProfileImage.js";
import {v2 as cloudinary} from 'cloudinary';

const userRouter = express.Router();


const uploadProfile = multer({ storage: profileStorage })
cloudinary.config({ 
    cloud_name: "drngnsgwy", 
    api_key:"633477472154828", 
    api_secret: "8WYPv55obEtE2TccDQ_X76Oss2o" 
  });

userRouter.get('/new-user', newUser);
userRouter.post('/register', handleRegister);
userRouter.post('/login', handleLogin);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/user-details', getUserdetails);
userRouter.post('/upload-profile-image',uploadProfile.single("profile-image"), handleProfileUpload);







export default userRouter