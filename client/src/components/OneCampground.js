import React, {useState, useContext} from "react"
import axios from "axios"

export default function OneCampground(props) {

    const {name, parkId, addresses, park} = props

    const [camps, setCamps] = useState([])
    const [savedCamp, setSavedCamp] = useState([])

    const handleSave = () => {
        console.log(camps)
        
        const campObj = {
            _id:camps._id,
            name: camps[0].name,
            parkId:camps.parkId,
            location: camps[0].location,
            difficulty: camps[0].difficulty,
            length: camps[0].length,
            elevationChange: camps[0].elevationChange,
            routeType: camps[0].routeType,
            reviews: camps[0].reviews,
            park: camps[0].park,
        }
        console.log(campObj)
        axios.post("/my-travel", campObj)
            .then(res => setSavedCamp(res.data))
            .catch(err => console.log(err))
    }
    
    return (
        <div className="camp">
            <h1>Campground Name: {name}</h1>
            <p>Park Id: {parkId}</p>
            <p>Location: {addresses}</p>
            <p>Park: {park}</p>
            <button onClick={handleSave}></button>
        </div>
    )
}
