import { Request, Response } from "express";
import Attendance from "../models/attendance.model";
import { ObjectId } from "mongoose";


export const markAttendance = async (req: Request, res: Response) => {
    try {
        const data: { userId: ObjectId; date: Date }[] = req.body;
        for (const user of data) {
            const currDate:Date = new Date(user.date);
            let attendance = await Attendance.findOne({ user: user.userId });
            if(attendance) {
                let newCount:number = attendance.total + 1;
                if(currDate.getMonth() != attendance.date.getMonth()){
                    newCount = 1;
                }else if(currDate.getDate() === attendance.date.getDate()) {
                    newCount = newCount - 1;
                }
                await Attendance.findByIdAndUpdate(attendance._id,{$set:{total:newCount,date:currDate}})
            }else{
                attendance = new Attendance({total:1,date:currDate,user:user.userId})
                attendance.save()
            }
        }
        res.status(201).send({error: false, Mesage: "Attendance Marked Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: true, errorData: { error } });
    }
}

export const getTodayAttendance = async(req:Request,res:Response) => {
    try{
        const userId:string = req.params.id;
        let todayDate = new Date(Date.now());
        todayDate.setHours(0,0,0,0);
        todayDate.setMinutes(todayDate.getMinutes() + 5.5 * 60);
        const attendance = await Attendance.findOne({user:userId,date:todayDate});
        res.status(200).send({error:false,attendance});
    }catch (error) {
        res.status(500).json({ error: true, errorData: { error } });
    }
}

