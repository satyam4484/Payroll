import React, { useState } from "react";
import { updatePayrollDetails, addPayrollDetails } from '../../../api/apiUrl'
import PayrollFormat from "../../CompanyDetails/DropPaymentConfig/PayrollDetails/PayrollViewFormat";
import PayrollEditFormat from "../../CompanyDetails/DropPaymentConfig/PayrollDetails/PayrollEditFormat";
import { CrossIcon } from "../../../ui/Icons";

const UpdateUserPayroll = ({ payrollDetails, userProps, onClose }) => {

    const payrollId = userProps?.payroll?._id

    const { HRA, Conveyance, WashingAllowance, MedicalAllowance, OtherAllowance, EmployeePF, EmployeesESIC, MLWF, PT, EmployerPF, EmployerESIC, _id } = payrollDetails;

    const [updatedItems, setUpdatedItems] = useState({});
    const [editableItems, setEditableItems] = useState({
        HRA: { value: HRA?.value, operation: HRA?.operation },
        Conveyance: { value: Conveyance?.value, operation: Conveyance?.operation },
        WashingAllowance: { value: WashingAllowance?.value, operation: WashingAllowance?.operation },
        MedicalAllowance: { value: MedicalAllowance?.value, operation: MedicalAllowance?.operation },
        OtherAllowance: { value: OtherAllowance?.value, operation: OtherAllowance?.operation },
        EmployeePF: { value: EmployeePF?.value?.$numberDecimal, operation: EmployeePF?.operation },
        EmployeesESIC: { value: EmployeesESIC?.value?.$numberDecimal, operation: EmployeesESIC?.operation },
        PT: { value: PT?.value, operation: PT?.operation },
        MLWF: { value: MLWF?.value, operation: MLWF?.operation },
        EmployerPF: { value: EmployerPF?.value?.$numberDecimal, operation: EmployerPF?.operation },
        EmployerESIC: { value: EmployerESIC?.value?.$numberDecimal, operation: EmployerESIC?.operation },
    });


    // Formatted date
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    // Function to toggle edit mode for a payroll item
    const toggleEditMode = (itemName) => {
        setEditableItems((prevState) => ({
            ...prevState,
            [itemName]: {
                ...prevState[itemName],
                isEditing: !prevState[itemName]?.isEditing,
            },
        }));
    };

    // Function to handle value change for a payroll item
    const handleValueChange = (itemName, newValue) => {

        setEditableItems((prevState) => ({
            ...prevState,
            [itemName]: {
                ...prevState[itemName],
                value: parseInt(newValue),
            },
        }));

        setUpdatedItems((prevUpdatedItems) => ({
            ...prevUpdatedItems,
            [itemName]: true,
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

    // Function to handle the "Save" button click
    const handleSaveClick = (name) => {
        toggleEditMode(name)

        const updatedPayrollData = {};

        // Filter out only the updated items
        for (const itemName in updatedItems) {
            if (updatedItems[itemName]) {
                let { value, operation } = editableItems[itemName];

                if (value === "" || value === null || isNaN(value)) {
                    value = 0;
                }
                updatedPayrollData[itemName] = { value, operation };
            }
        }

        // Call the API to update the payroll data
        updatePayrollDetails(payrollId, updatedPayrollData).then((response) => {

            if (response.error === false) {
                // console.log(response.error);
                console.log(response.updatedPayroll);
                console.log("Payroll Updated!")

                // Reset the updated items and set isEditing to false for updated items
                const resetUpdatedItems = {};
                for (const itemName in updatedItems) {
                    resetUpdatedItems[itemName] = false;
                }

                setUpdatedItems(resetUpdatedItems);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    // Define a function to render payroll items with symbols
    const renderPayrollItem = (name, itemData) => {

        const itemNameWithoutSpaces = name.replace(/\s/g, '');
        const symbol = renderMathSymbol(itemData?.operation);
        const isEditing = itemData?.isEditing;

        return (
            <div className="my-3">

                {isEditing ? (
                    <>
                        <PayrollEditFormat
                            name={name}
                            onClickSave={() => handleSaveClick(itemNameWithoutSpaces)}
                            itemDataValue={itemData?.value}
                            onChangeValue={(e) => handleValueChange(itemNameWithoutSpaces, e.target.value)}
                            onChangeOperation={(e) => handleOperationChange(itemNameWithoutSpaces, e.target.value)}
                            itemDataOperation={itemData?.operation}
                        />
                    </>
                ) : (
                    <>
                        <PayrollFormat
                            name={name}
                            onClickEdit={() => toggleEditMode(itemNameWithoutSpaces)}
                            itemDataValue={itemData?.value}
                            symbol={symbol}
                        />
                    </>

                )}
            </div>
        );
    };

    return (
        <>

            <div className="flex items-center justify-evenly">
                <p className="text-2xl font-bold plusJakartaSans uppercase">Payroll</p>
                <div className="bg-white px-3 py-1 rounded-xl">
                    <p className='text-gray-500 text-sm'>Name:  <span className='plus-jkrt uppercase text-gray-900 font-semibold'>{userProps.name}</span></p>
                    <p className='text-gray-500 text-sm'>Userid:  <span className='plus-jkrt text-gray-900 font-semibold'>{userProps.user_id}</span></p>
                </div>
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

export default UpdateUserPayroll;
