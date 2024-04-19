import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>links : </h1>

            <ul>
                <Link to={"/dashboard"}>dashboard</Link>
                <br />
                <Link to={"/profile"}>profile</Link>
                <br />



            </ul>

        </div>
    )
}

export default Home