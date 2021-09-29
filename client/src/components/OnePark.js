import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { PCContext } from "../context/ParksCampsProvider.js"

export default function OnePark(props) {

    return (
        <div className="park" id={props.id}>
            <div className="imageDiv"> {props.images[0] != undefined ?
                <img className="homeImage" src={props.images[0].url} />
                :
                <p>No Image available</p>
            }</div>
            <div>
            <Link to={`/parks/${props.id}`} ><h1 className="parkTitle">{props.fullName}</h1></Link>
            </div>
        </div>
    )
}