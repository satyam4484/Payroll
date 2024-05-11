import { Request, Response } from "express";
import AttendanceModel,{DailyAttendanceInterface} from "../models/attendance.model"
import { logVariable } from "../services/services";
import { getGMT } from "../services/services";

const { Attendance, DailyAttendance } = AttendanceModel;

export const markAttendance = async (req: Request, res: Response) => {
    try {
        const data:DailyAttendanceInterface=req.body;
        const date:Date = new Date(data.date);
        const dailyattendance = new DailyAttendance({
            user:data.user,
            date,
            status:data.status,
            overtime:data.overtime
        });
        await dailyattendance.save();
        let attendance = await Attendance.findOne({ user: data.user });
            if(attendance) {
                let newCount:number = attendance.total + 1;
                if(date.getMonth() != attendance.date.getMonth()){
                    newCount = 1;
                }else if(date.getDate() === attendance.date.getDate()) {
                    newCount = newCount - 1;
                }
                await Attendance.findByIdAndUpdate(attendance._id,{$set:{total:newCount,date}})
            }else{
                attendance = new Attendance({total:1,date,user:data.user})
                attendance.save()
            }
        res.status(201).send({error: false, Mesage: "Attendance Marked Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: true, errorData: { error } });
    }
}

export const getTodayAttendance = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id;
        const dateString: string = req.query.date as string; // Assuming req.query.date is a string
        const todayDate: Date = new Date(dateString);
        const attendance = await DailyAttendance.findOne({ user: userId, date: todayDate });
        res.status(200).send({ error: false, attendance });
    } catch (error) {
        res.status(500).json({ error: true, errorData: { error } });
    }
}

export const generateAttendanceExcel = async(req:Request,res:Response) => {
    try{

    }catch(error){

    }
}