import React, { useState, useContext, useEffect } from "react"
import OnePark from "./OnePark.js"
import Pagination from "./Pagination.js"
import { UserContext } from "../context/UserProvider.js"
import axios from "axios"
export default function Home(props) {

    const { user: { username } } = useContext(UserContext)

    const [search, setSearch] = useState("")
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredContent, setFilteredContent] = useState([])
    const [currentPage, setCurrentPage] = useState([1])
    const [parksPerPage, setParksPerPage] = useState([50])

    useEffect(() => {
        axios.get(`https://developer.nps.gov/api/v1/parks?limit=467&api_key=0FCjJ1XRiD4kyXSOGCWRY1CgTjLvgmusmOgb34vC`)
            .then(res => {
                setContent(res.data)
                setLoading(false)
                console.log(res.data)
            })
            .catch(err => console.log(`Error: ${err}`))
    }, [])

    const handleChange = (e) => {
        const { value } = e.target
        setSearch(value)
        const newFilter = content.data.filter(content => {
            return content.name.toLowerCase().startsWith(search.toLocaleLowerCase())
        })
        console.log(newFilter)
        setFilteredContent(newFilter)
        console.log(filteredContent)
    }

    // const paginate = (pageNumber) => {
    //     setCurrentPage(pageNumber)
    // }

    const BarStyling = { width: "30rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    return (
        <div>
            <div className="home">
                <h3 className="welcome">Welcome {username}</h3>
                <div className="parkSearchBar">
                    <input
                        id="searchbar"
                        style={BarStyling}
                        value={search}
                        placeholder={"Search Park by Name"}
                        onChange={handleChange}
                    />
                </div>
                <div className="homePark">
                    {(!loading && filteredContent.length === 0) ?
                        content.data.map(content => {
                            return <div key={content.id} className="onePark">
                                <OnePark key={content.id}{...content} />
                            </div>
                        })
                        : filteredContent.map(content => {
                            return <div key={content.id}>
                                <OnePark {...content} />
                            </div>
                        })
                    }
                </div>
                {/* <Pagination parksPerPage={parksPerPage} totalParks={content.legnth} paginate={paginate} /> */}
            </div>
        </div>
    )
}