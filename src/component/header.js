import React from 'react'
import "./header.css"

function header() {
    return (
        <div className="container-fluid px-0"> 
            <div className="row no-gutters">
                <div className="col-lg-12 bg-primary">
                    <header>
                        <h1>Bookmarking Application</h1>
                    </header>
                </div>
            </div>
        </div>
    )
}

export default header
