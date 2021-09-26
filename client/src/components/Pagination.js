import React from "react"


const Pagination = ({ parksPerPage, totalParks, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalParks / parksPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            {pageNumbers.map(number => (
                <div key={number} className="pageItem">
                    <li>
                    <a onClick={() => paginate(number)}href="!=">{number}</a>
                    </li>
                </div>
            ))
            }
        </div>
    )
}

export default Pagination