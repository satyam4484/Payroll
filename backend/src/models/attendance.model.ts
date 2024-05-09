import {ObjectId, Schema,model} from "mongoose";

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


const Attendance = model<AttendanceInterface>("Attendance",AttendanceSchema);

export default Attendance;