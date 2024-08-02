import React from 'react'

const Spinner = () => {
    return (
        <div className="d-flex justify-content-center bg-black bg-gradient text-info vh-100 flex-d align-items-center z-3">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}

export default Spinner