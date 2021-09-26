import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {

    const { logout, token } = props
    return (
        <div className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/my-travel">My Travel</Link> 
           <button onClick={logout} className="logoutButton">
                <Link to="/" className="logout">Log Out</Link>
            </button> 
        </div>
    )
}