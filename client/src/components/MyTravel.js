import React, { useEffect, useState } from "react"
import axios from "axios"
import OnePark from "./OnePark"

export default function MyTravel(props) {


    const userAxios = axios.create()
    const { username, _id } = props
    const [savedLocations, setSavedLocations] = useState([])
    
    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const getSavedParks = () => {
        userAxios.get("/api/mytravel/user")
            .then(res => {
                setSavedLocations(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(`Error: ${err}`))
    }

    useEffect(() => {
       getSavedParks()
    }, [])

    const deleteLocation = (_id) => {
        userAxios.delete(`/api/mytravel/${_id}`)
        .then(res => setSavedLocations(prevState => prevState.filter(location => location._id !== _id)))
        .catch(err => console.log(err))
        getSavedParks()
    }
    
    console.log(savedLocations)
    const mappedLocations = savedLocations.map(location => {
        return <div key={location.id} className="singlePark">
        <h2>Name: {location.fullName}</h2>
        <p className="parksDesc">Description: {location.description}</p>
        <img className="parksImage" src={location.images} />
        <p className="myTravelLocation">{location.addresses}</p>
        <a href={location.url} className="travelUrl">{location.url}</a> 
        <p>{location.addresses.city} {location.addresses.stateCode} {location.addresses.postalCode}</p>
        <button onClick={() => deleteLocation(location._id)} className="deleteButton">Delete</button>
        </div>
    })
    return (
        <div>
            <h1 className="futureTrip">Future Trips</h1>
        <div className="myTravel">
            {mappedLocations}
        </div>
        </div>
    )
}