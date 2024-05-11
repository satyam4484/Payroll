import React from "react";
import { useGlobalContext } from '../provider/Context';

const Message = ({ newClass }) => {

    const { error } = useGlobalContext();
    const { isError, message } = error;

    return (
        <>
            <p className={`${newClass} inline-block inter font-semibold text-md capitalize ${isError == true ? 'text-red-500' : 'text-green-500'} `}>
                {message}
            </p>
        </>
    );
}

export default Message