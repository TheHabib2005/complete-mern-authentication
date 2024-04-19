
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const token = jwtDecode(localStorage.getItem("auth-token")).token;
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("auth-token");
        navigate("/login")
    };

    const getUserInfo = async () => {
        try {
            setIsLoading(true);
            let response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/users/user-details`, { userId: token });


            if (response.data.success) {
                let decodeData = await jwtDecode(response.data.data)
                setUserInfo(decodeData.token)
                setIsLoading(false);
            }

            if (response.data.error && response.data.message === "User not found") {
                localStorage.removeItem("auth-token")
                logout()
            }

            setIsLoading(false);


        } catch (error) {
            setIsLoading(false)
            console.log(error);

        }
    };

    useEffect(() => {
        getUserInfo()
    }, [])


    if (isLoading) {
        return <div>Loading...</div>
    }

    console.log("incodedc data", userInfo);


    return (
        <>

            {
                userInfo &&
                <div>Profile :

                    <img src={userInfo.profileImage} alt="" />
                    <div>username:{userInfo.username}</div>
                    <div>email:{userInfo.email}</div>
                    <button onClick={logout
                    }>Logout</button>
                </div>

            }
            hello mr
        </>
    )
}

export default Profile