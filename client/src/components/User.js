import React, { useState, useEffect } from "react"
import axios from "axios"

 function User(props) {
    const { username, _id} = props
    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })


    return (
        <div className="user-locations">
            <h3>{username}'s Locations</h3>
        </div>
    )
}

export default User