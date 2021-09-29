import React, { useContext, useState, useEffect } from "react"
import { PCContext } from "../context/ParksCampsProvider.js"
import { Link } from "react-router-dom"
import OnePark from "./OnePark"
import axios from "axios"


export default function Parks(props) {

    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const [onePark, setOnePark] = useState([])
    const [savedPark, setSavedPark] = useState([])
    const { getPark, park } = useContext(PCContext)

    const id = window.location.href.split("/")

    useEffect(() => {
        getPark(id[4])
        console.log("this fired")
        setOnePark(park.data)
    }, [])

    console.log(park.data)

    const handleParkSave = (e) => {

        e.preventDefault()
        const parkObj = {
            id: park.data[0].id,
            fullName: park.data[0].fullName,
            description: park.data[0].description,
            images: park.data[0].images[0].url,
            addresses: ` ${park.data[0].addresses[0].city}, ${park.data[0].addresses[0].line1} 
    ${park.data[0].addresses[0].stateCode}, ${park.data[0].addresses[0].postalCode} `,
            url: park.data[0].url

        }
        console.log(parkObj)
        userAxios.post("/api/mytravel", parkObj)
            .then(res => {
                console.log(res.data)
                setOnePark(res.data)
                console.log(onePark)
            })
            .catch(err => console.log(err))
    }

    console.log(onePark)
    return (
        <div className="parks">
            {park.data != undefined ?
                <div className="parksDiv">
                    <h2 className="parksName">{park.data[0].fullName}</h2>
                    <p className="parksDescription">{park.data[0].description}</p>
                    <img className="parksImg" src={park.data[0].images[0].url} />
                    <p>{park.data[0].addresses[0].line1}</p>
                    <p>{park.data[0].addresses[0].line2}</p>
                    <p>{park.data[0].addresses[0].line3}</p>
                    <p className="address">{park.data[0].addresses[0].city} {park.data[0].addresses[0].stateCode} {park.data[0].addresses[0].postalCode}</p>
                     {/* <a href={park.data[0].url} className="url">{park.data[0].url}</a>  */}
                    <button onClick={(e) => (window.location = `${park.data[0].url}`)} className="urlBtn">{park.data[0].url}</button>
                    <button onClick={handleParkSave}>Save Location</button></div>
                : <p>No Data</p>
            }
        </div>
    )
}