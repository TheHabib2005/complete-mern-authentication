import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigation = useNavigate()



    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault()
                console.log({
                    username, email, password
                });

                const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/users/register`, { username, email, password });
                console.log(response.data);
                if (response.data.success) {
                    navigation(`/verify-email?id=${response.data.user_id}/`)
                }
            }}>
                <input type="text" onChange={(e) => setusername(e.target.value)} value={username} placeholder='username' />
                <input type="text" onChange={(e) => setemail(e.target.value)} value={email} placeholder='email' />
                <input type="text" onChange={(e) => setpassword(e.target.value)} value={password} placeholder='password' />
                <div> <button>submit</button></div>
                <Link to={"/login"}>create account</Link>

            </form>
        </div>
    )
}

export default Register