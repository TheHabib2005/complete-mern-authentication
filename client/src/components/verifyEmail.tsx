import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const VerifyEmail = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState("")
    // console.log(searchParams.get("id")?.split("/").filter(e => e).toString());
    let userId = searchParams.get("id")?.split("/").filter(e => e).toString()

    const getVerifyCode = async () => {
        try {
            let response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/users/verify-email`, { userId, codeFromUser: inputValue });
            console.log(response.data);
            if (response.data.success) {
                navigate("/login")
            }
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={() => getVerifyCode()} >verify</button>
        </div>
    )
}

export default VerifyEmail