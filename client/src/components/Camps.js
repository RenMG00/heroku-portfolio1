import React, {useState, useEffect, useContext} from "react"
import {PCContext} from "../context/ParksCampsProvider.js"
import axios from "axios"

export default function Campgrounds(props) {

    const { id } = props
    const [oneCamp, setOneCamp] = useState([])
    const [savedCamp, setSavedCamp] = useState([])
    const { getCampground, campground } = useContext(PCContext)

    console.log(campground)
    
    useEffect(() => {
        getCampground()
    }, [])

    const handleCampSave = () => {
        
        const campObj = {
            id: oneCamp.id,
            name: oneCamp[0].name,
            description: oneCamp[0].description,
            images: oneCamp[0].images.url,
            addresses: oneCamp[0].addresses,
        }
        console.log(campObj)
        axios.post("/my-travel", campObj)
            .then(res => setSavedCamp(res.data))
            .catch(err => console.log(err))
    }

    return (
        <div className="camps">
         <h2>Name: {campground.name}</h2>
            <p>Description: {campground.description}</p>
            <button onClick={handleCampSave}>Save Location</button>
        </div>
    )
}