import React, { useState, useEffect } from "react"
import axios from "axios"

const PCContext = React.createContext()

function ParksCampsProvider(props) {

    const [park, setPark] = useState([])
    const [campgrounds, setCampgrounds] = useState([])
    
    // const getAllCampgrounds = () => {
    //     axios.get(`https://developer.nps.gov/api/v1/campgrounds?limit=613&api_key=0FCjJ1XRiD4kyXSOGCWRY1CgTjLvgmusmOgb34vC`)
    //         .then(res => {
    //             setContent(res.data)
    //             setLoading(false)   
    //         })
    //         .catch(err => console.log(`Error: ${err}`))
    // }
    const getPark = (id) => {
        axios.get(`https://developer.nps.gov/api/v1/parks?limit=1&q=${id}&api_key=0FCjJ1XRiD4kyXSOGCWRY1CgTjLvgmusmOgb34vC`)
            .then(res => {
                setPark(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(`Error: ${err}`))
    }

    const getCampground = (id) => {
        axios.get(`https://developer.nps.gov/api/v1/campgrounds?limit=1?id=${id}&api_key=0FCjJ1XRiD4kyXSOGCWRY1CgTjLvgmusmOgb34vC`)
        .then(res => {
            setPark(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(`Error: ${err}`))
    }
    const savePark = (newPark) => {
        axios.post("/mytravel", newPark)
          .then(res => {
            setPark(prevPark => [...prevPark, res.data])
          })
          .catch(err => console.log(err))
      }

    //   const saveTrail = (newTrail) => {
    //     axios.post("/my-travel", newTrail)
    //       .then(res => {
    //         setTrails(prevTrail => [...prevTrail, res.data])
    //       })
    //       .catch(err => console.log(err))
    //   }


    return (
        <PCContext.Provider
            value={{
                park,
                //content,
                //setContent,
                //loading,
                setPark,
                //campgrounds,
                //getAllParks,
                //getAllCampgrounds,
                getCampground,
                getPark,
                savePark,
                // saveTrail

            }}>
            {props.children}
        </PCContext.Provider>
    )
}

export { PCContext, ParksCampsProvider }