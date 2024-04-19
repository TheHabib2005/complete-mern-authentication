import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigation = useNavigate()



    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault()
                console.log({
                    email, password
                });

                const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/users/login`, { email, password });
                console.log(response.data);
                if (response.data.success) {
                    localStorage.setItem("auth-token", response.data.user_token)
                    navigation("/profile")
                }
            }}>
                <input type="text" onChange={(e) => setemail(e.target.value)} value={email} placeholder='email' />
                <input type="text" onChange={(e) => setpassword(e.target.value)} value={password} placeholder='password' />
                <div> <button>Login</button></div>
                <p>reset password</p>
                <Link to={"/register"}>create account</Link>
            </form>
        </div>
    )
}

export default Login