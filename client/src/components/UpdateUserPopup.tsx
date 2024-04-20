import axios from "axios";
import { FC, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";


const UpdateUserPopup = ({ userInfo, isOpen, setIsOpen }) => {
    const [updatedInfo, setUpdatedInfo] = useState({
        username: userInfo.username || "",
        password: userInfo.password || "",
        profileImage: userInfo.profileImage || "",
    });
    const navigate = useNavigate()
    const [isUploading, setIsUploading] = useState(false)

    const [selectedImageUrl, setSelectedImageUrl] = useState("");

    const fileInputRef = useRef<HTMLInputElement>();

    const handleFileUpload = async () => {

        const file = fileInputRef.current?.files?.[0];
        const headers = {
            "user-id": userInfo._id
        }
        try {
            setIsUploading(true)
            if (file) {
                const formData = new FormData();
                formData.append("profile-image", file);
                const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/users/upload-profile-image`, formData, { headers });
                console.log(response.data);
                setSelectedImageUrl(response.data.url);
                setIsOpen(false)
                setIsUploading(false)
            }
        } catch (error) {
            setIsUploading(false)
            console.log(error);

        }
    }





    return (
        <div >

            <button onClick={() => setIsOpen(false)}>close</button>

            <div>
                <input type="file" name="profile-image" onChange={(e) => {
                    let currentFile = e.target.files[0];
                    let fileUrl = URL.createObjectURL(currentFile);
                    setSelectedImageUrl(fileUrl)
                }} hidden ref={fileInputRef} id="" />
                {
                    selectedImageUrl ?
                        <img src={selectedImageUrl} alt="profile-image" width={100} />
                        :
                        <img src={userInfo.profileImage} alt="profile-image" width={200} />
                }
                {isUploading && <h1>Uploading...</h1>}
                <button onClick={() => {
                    fileInputRef.current?.click();

                }} disabled={isUploading}>change image</button>
                {selectedImageUrl && <button onClick={handleFileUpload} disabled={isUploading}>upload image</button>}
                {/* <button>remove image </button> */}
            </div>
            <div>
                <h1>user info's</h1>
                <div>
                    <input type="text" name="username" onChange={(e) => {
                        setUpdatedInfo(prevState => ({
                            ...prevState,
                            username: e.target.value,
                        }));
                    }} value={updatedInfo.username} />
                </div>
                <div>
                    <input type="password" name="password" onChange={(e) => {
                        setUpdatedInfo(prevState => ({
                            ...prevState,
                            password: e.target.value,
                        }));
                    }} value={updatedInfo.password} />
                </div>

                <div>
                    <button >save changes</button>
                </div>
            </div>


        </div>
    )
}

export default UpdateUserPopup