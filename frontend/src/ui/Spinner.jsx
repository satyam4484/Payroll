import React from 'react'
import spinner from '../assets/images/spinner.svg'
import { useGlobalContext } from '../provider/Context'

const Spinner = ({ newClass }) => {

    // const { toggleSpinner, isLoading } = useGlobalContext();


    return (
        <div className='flex items-center justify-center'>
            <img src={spinner} className={newClass} />
        </div>
    )
}

export default Spinner