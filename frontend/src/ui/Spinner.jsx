import React from 'react'
import spinner from '../assets/images/spinner.svg'


const Spinner = ({ newClass }) => {
    return (
        <img src={spinner} className={newClass} />
    )
}

export default Spinner