import React from 'react'

const Alert = (props) => {
    return (
        <div className='container'>
            <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
                <strong> {props.message}</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    )
}


Alert.defaultProps = {
    type:"primary"
}

export default Alert
