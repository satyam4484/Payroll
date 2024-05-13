export const AttendanceColumns = [
    { header: 'SR', key: 'sr', width: 5 }, // Set width for 'SR' column
    { header: 'Employee Id', key: 'employee_id', width: 20 }, // Set width for 'Employee Id' column
    { header: 'Employee Name', key: 'employee_name', width: 20 }, // Set width for 'Employee Name' column
    { header: 'Category', key: 'category', width: 10 }, // Set width for 'Category' column
    ...Array.from({ length: 31 }, (_, index) => ({
        header: `${index + 1}`,
        key: `${index + 1}`,
        width: 4, // Set default width for all day columns
    })),
    { header: 'Total', key: 'total', width: 10 },
    { header: 'OT', key: 'ot', width: 5 },
];