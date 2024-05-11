import { Schema, model, Decimal128 } from "mongoose";


// Define the Payroll interface for the model
export interface PayrollInterface {
    HRA: {
        value:number;
        operation: number;
    };
    Conveyance: {
        value:number;
        operation: number;
    };
    WashingAllowance: {
        value:number;
        operation: number;
    };
    MedicalAllowance: {
        value:number;
        operation: number;
    };
    OtherAllowance: {
        value:number;
        operation: number;
    };
    EmployeePF: {
        value: Decimal128;
        operation: number;
    };
    EmployeesESIC: {
        value: Decimal128;
        operation: number;
    };
    PT: {
        value: number;
        operation: number;
    };
    MLWF: {
        value: number;
        operation: number;
    };
    EmployerPF: {
        value: Decimal128;
        operation: number;
    };
    EmployerESIC: {
        value: Decimal128;
        operation: number;
    };
};



const payrollSchema = new Schema<PayrollInterface>({
    HRA: {
        value: { type: Number, default: 0 },
        operation: { type: Number, default: 3 },
    },
    Conveyance: {
        value: { type: Number, default: 0 },
        operation: { type: Number, default: 0 },
    },
    WashingAllowance: {
        value: { type: Number, default: 0 },
        operation: { type: Number, default: 0 },
    },
    MedicalAllowance: {
        value: { type: Number, default: 0 },
        operation: { type: Number, default: 0 },
    },
    OtherAllowance: {
        value: { type: Number, default: 0 },
        operation: { type: Number, default: 0 },
    },
    EmployeePF: {
        value: { type: Schema.Types.Decimal128, default: 12 },
        operation: { type: Number, default: 3 },
    },
    EmployeesESIC: {
        value: { type: Schema.Types.Decimal128, default: 0.75 },
        operation: { type: Number, default: 3 },
    },
    PT: {
        value: { type: Number, default: 200 },
        operation: { type: Number, default: 0 },
    },
    MLWF: {
        value: { type: Number, default: 0 },
        operation: { type: Number, default: 0 },
    },
    EmployerPF: {
        value: { type: Schema.Types.Decimal128, default: 13 },
        operation: { type: Number, default: 3 },
    },
    EmployerESIC: {
        value: { type: Schema.Types.Decimal128, default: 3.25 },
        operation: { type: Number, default: 3 },
    },
});

const Payroll = model<PayrollInterface>("Payroll", payrollSchema);

export default Payroll;
