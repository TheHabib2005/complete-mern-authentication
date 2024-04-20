import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
import User from '../db/models/user.model.js';

  
const handleProfileUpload = async (req,res) =>{
  const headers = req.headers["user-id"];
  const user = await User.findOne({_id:headers})

  console.log(headers);
    try {
        cloudinary.uploader.upload(req.file.path, (error, result) => {
          if (error) {
            return res.status(500).json({ error: 'Upload to Cloudinary failed' });
          }
          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('File deleted successfully');
            }
          });
           user.profileImage = result.url;
           user.save();
          return res.json({
            success:true,
            message:"Profile image uploaded successfully",
            url:result.url
        }).status(200)
        });
       } catch (error) {
        console.log("error",error);
        res.json({ error:error });
        
       }
}

export default handleProfileUpload;