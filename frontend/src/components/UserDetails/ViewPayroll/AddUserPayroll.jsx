import React, { useState } from "react";
import { CrossIcon } from '../../../ui/Icons';
import { addPayrollDetails } from '../../../api/apiUrl'

const AddUserPayroll = ({ userProps, onClose }) => {

    const [newPayrollId, setNewPayrollId] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [editableItems, setEditableItems] = useState({
        HRA: { value: 0, operation: 0 },
        Conveyance: { value: 0, operation: 0 },
        WashingAllowance: { value: 0, operation: 0 },
        MedicalAllowance: { value: 0, operation: 0 },
        OtherAllowance: { value: 0, operation: 0 },
        EmployeePF: { value: 0, operation: 0 },
        EmployeesESIC: { value: 0, operation: 0 },
        MLWF: { value: 0, operation: 0 },
        PT: { value: 0, operation: 0 },
        EmployerPF: { value: 0, operation: 0 },
        EmployerESIC: { value: 0, operation: 0 },
    });

    // Function to handle value change for a payroll item
    const handleValueChange = (itemName, newValue) => {
        setEditableItems((prevState) => ({
            ...prevState,
            [itemName]: {
                ...prevState[itemName],
                value: parseInt(newValue),
            },
        }));
    };

    // Add a function to handle operation change
    const handleOperationChange = (itemName, newOperation) => {
        setEditableItems((prevState) => ({
            ...prevState,
            [itemName]: {
                ...prevState[itemName],
                operation: parseInt(newOperation),
            },
        }));
    };

    // Define a function to render mathematical symbols based on the operation value
    const renderMathSymbol = (operation) => {
        switch (operation) {
            case 0:
                return "+";
            case -1:
                return "-";
            case 1:
                return "x";
            case 2:
                return "/";
            case 3:
                return "%";
            default:
                return "";
        }
    };

    const operationOptions = [
        { value: 0, label: "+" },
        { value: -1, label: "-" },
        { value: 1, label: "x" },
        { value: 2, label: "/" },
        { value: 3, label: "%" },
    ];

    // Function to handle the "Save" button click
    const handleSubmit = (name) => {
        setIsEditing(false)

        editableItems.type = "Employee"
        editableItems._id = userProps._id

        // Call the API to update the payroll data
        addPayrollDetails(editableItems).then((response) => {
            if (response.error === false) {
                // console.log(response);
                localStorage.setItem('userPayrollId', response.savedPayroll._id)

                setTimeout(() => {
                    localStorage.removeItem('userPayrollId')
                }, 60000) // 1 min

                setIsEditing(true)
                console.log("Payroll Added Successfully!");
            }
        }).catch((error) => {
            setIsEditing(false)
            console.log(error);
        });
    };

    // Define a function to render payroll items with symbols
    const renderPayrollItem = (name, itemData) => {

        const itemNameWithoutSpaces = name.replace(/\s/g, '');
        const symbol = renderMathSymbol(itemData?.operation);

        return (
            <div className="my-3">

                {
                    isEditing ? (
                        <>
                            <div className="flex justify-between">
                                <p className="text-gray-500 font-normal text-sm plusJakartaSans mb-1">
                                    {name}
                                </p>
                            </div>
                            <div className="flex items-center px-4 justify-between border rounded-lg w-[20.4375rem] h-11 bg-gray-200 shadow-gray-400 shadow-md">
                                <p className="text-gray-700 font-medium plusJakartaSans">
                                    {itemData?.value}
                                </p>
                                <p className="text-gray-700 font-medium plusJakartaSans">
                                    {symbol}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-between">
                                <p className="text-gray-500 font-normal text-sm  plusJakartaSans mb-1">
                                    {name}
                                </p>
                            </div>
                            <div className="flex items-center px-4 justify-between border rounded-lg w-[20.4375rem] h-11 bg-gray-200 shadow-gray-400 shadow-md">
                                <input
                                    type="number"
                                    className="text-gray-700 font-medium plusJakartaSans w-24 outline-none border-b border-black bg-gray-200"
                                    value={itemData?.value}
                                    onChange={(e) => handleValueChange(itemNameWithoutSpaces, e.target.value)}
                                />

                                <select
                                    value={itemData?.operation}
                                    onChange={(e) => handleOperationChange(itemNameWithoutSpaces, e.target.value)}
                                    className="text-gray-700 text-center font-medium plusJakartaSans w-10 outline-none border-b border-black bg-gray-200"
                                >
                                    {operationOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )
                }
            </div>
        );
    };

    return (
        <>
            <div className="flex items-center justify-around">
                <p className="text-2xl font-bold plusJakartaSans uppercase">Add Payroll</p>
                <div className="bg-white px-3 py-1 rounded-xl">
                    <p className='text-gray-500 text-sm'>Name:  <span className='plus-jkrt uppercase text-gray-900 font-semibold'>{userProps.name}</span></p>
                    <p className='text-gray-500 text-sm'>Userid:  <span className='plus-jkrt text-gray-900 font-semibold'>{userProps.user_id}</span></p>
                </div>

                <button onClick={handleSubmit} className='border border-green-500 focus:shadow-none hover:bg-green-500 hover:text-white font-normal px-3 py-1 text-sm rounded-lg shadow-md disabled:cursor-not-allowed disabled:bg-green-500 disabled:text-white' disabled={isEditing}>
                    {isEditing ? 'Done' : 'Submit'}
                </button>

                <button
                    type="button"
                    onClick={onClose}
                    className="float-end p-3 hover:shadow-md hover:rounded-full hover:bg-white"
                >
                    <CrossIcon />
                </button>
            </div>

            <div>
                <div className="grid grid-cols-12 place-items-center ">
                    <div className="md:col-span-6 sm:col-span-12">
                        {renderPayrollItem("HRA", editableItems.HRA)}
                        {renderPayrollItem("Conveyance", editableItems.Conveyance)}
                        {renderPayrollItem("Medical Allowance", editableItems.MedicalAllowance)}
                        {renderPayrollItem("Washing Allowance", editableItems.WashingAllowance)}
                        {renderPayrollItem("Other Allowance", editableItems.OtherAllowance)}
                        {renderPayrollItem("PT", editableItems.PT)}
                    </div>

                    <div className="md:col-span-6 sm:col-span-12">
                        {renderPayrollItem("Employee PF", editableItems.EmployeePF)}
                        {renderPayrollItem("Employees ESIC", editableItems.EmployeesESIC)}
                        {renderPayrollItem("Employer PF", editableItems.EmployerPF)}
                        {renderPayrollItem("Employer ESIC", editableItems.EmployerESIC)}
                        {renderPayrollItem("MLWF", editableItems.MLWF)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUserPayroll;
