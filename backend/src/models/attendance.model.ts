import {Decimal128, ObjectId, Schema,model} from "mongoose";

export interface AttendanceInterface{
    total:number;
    date:Date;
    user?:ObjectId;
};

const AttendanceSchema = new Schema<AttendanceInterface>({
    total:{type:Number,default:0},
    date:{type:Date},
    user:{type:Schema.Types.ObjectId,ref:'User',required:true}
});

export interface DailyAttendanceInterface {
    user?: ObjectId;
    date: Date;
    status: Decimal128;
    overtime: number;
}

const DailyAttendanceSchema = new Schema<DailyAttendanceInterface>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    status: { type: Schema.Types.Decimal128, required: true },
    overtime: { type: Number, default: 0 } // Assuming overtime is optional with default value 0
});


const Attendance = model<AttendanceInterface>("Attendance",AttendanceSchema);
const DailyAttendance = model<DailyAttendanceInterface>('DailyAttendance', DailyAttendanceSchema);
export default {Attendance,DailyAttendance};