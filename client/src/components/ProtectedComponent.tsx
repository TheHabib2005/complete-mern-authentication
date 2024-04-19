import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
const ProtectedComponent = ({ children }) => {
    const [isLogin, setIsLogin] = useState(localStorage.getItem("auth-token") ? true : false || false)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate("/login")
        }
    }, [isLogin])


    return (
        <> {isLogin && children}</>
    )
}

export default ProtectedComponent