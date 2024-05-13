import { Request, Response } from "express";
import fs from "fs";
import User from "../models/user.model";
import AttendanceModel, { DailyAttendanceInterface } from "../models/attendance.model"
import excel from "exceljs";
import xlsx from "xlsx";
import { getGMT } from "../services/services";
import { AttendanceColumns } from "../services/data.services";
import { S3Client, PutObjectCommandInput, PutObjectCommand } from "@aws-sdk/client-s3";
const { DailyAttendance } = AttendanceModel;

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,         // AWS access key
        secretAccessKey: process.env.AWS_SECRET_KEY as string,     // AWS secret key
    },
    region: process.env.AWS_REGION as string,                  // AWS region where the S3 bucket is located
});

const bucket_name = process.env.BUCKET_NAME as string;

export const markAttendance = async (req: Request, res: Response) => {
    try {
        const data: DailyAttendanceInterface = req.body;
        const date: Date = new Date(data.date);
        const dailyattendance = new DailyAttendance({
            user: data.user,
            date,
            status: data.status,
            overtime: data.overtime
        });
        await dailyattendance.save();
        res.status(201).send({ error: false, Mesage: "Attendance Marked Successfully" })
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

export const generateAttendanceExcel = async (req: Request, res: Response) => {
    try {
        const date: Date = new Date(req.body.date as string);
        const firstDayOfNextMonth = getGMT(new Date(date.getFullYear(), date.getMonth() + 1, 1));
        const users = await User.find({ user_role: { $ne: 'admin' } }).populate([
            { path: 'category', select: 'category_name' }
        ]);
        const promises: Promise<void>[] = [];
        let counter: number = 1;
        const attendanceData: any[] = [];
        for (const user of users) {
            const promise = (async () => {
                const attendance = await DailyAttendance.find({ date: { $gte: date, $lt: firstDayOfNextMonth }, user: user._id }).sort({ date: 1 });
                const userData: any = {};
                const overtimeData: any = {};
                userData.sr = counter;
                overtimeData.sr = '';
                userData.employee_id = user.user_id;
                overtimeData.employee_id = '';
                userData.employee_name = user.name;
                overtimeData.employee_name = '';
                userData.category = user.category.category_name;
                overtimeData.category = '';
                let totalAttendance: any = 0.0;
                let totalOt: number = 0;
                let j = 0;
                for (let i = 0; i < 31; i++) {
                    const currDate = getGMT(new Date(date));
                    currDate.setDate(i + 1);
                    let status;
                    let overtime;
                    if (j < attendance.length) {
                        const att = attendance[j];
                        if (att.date.getDate() === currDate.getDate() &&
                            att.date.getMonth() === currDate.getMonth() &&
                            att.date.getFullYear() === currDate.getFullYear()) {
                            status = Number(att.status);
                            overtime = att.overtime;
                            totalAttendance += status;
                            totalOt += overtime;
                            j++;
                        }
                    }
                    userData[i + 1] = status || '';
                    overtimeData[i + 1] = overtime || '';
                }
                userData.total = totalAttendance;
                userData.ot = totalOt;
                attendanceData.push(userData);
                attendanceData.push(overtimeData);
            })();
            counter++;
            promises.push(promise);
        }
        await Promise.all(promises);
        const workbook = new excel.Workbook();
        const sheet = workbook.addWorksheet(date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate());
        sheet.columns = AttendanceColumns;
        for (const data of attendanceData) {
            sheet.addRow(data);
        }
        const excelBuffer = await workbook.xlsx.writeBuffer();
        const s3fileLocation = `Attendance/Monthly/Attendance_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}.xlsx`;
        const uploadParams: PutObjectCommandInput = {
            Bucket: bucket_name,
            Key: s3fileLocation,
            Body: excelBuffer as Buffer,
        };
        const uploadCommand = new PutObjectCommand(uploadParams);
        await s3.send(uploadCommand);
        // Construct the S3 file URL
        const s3FileUrl = `https://${bucket_name}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3fileLocation}`;
        // Send the S3 URL as a response
        res.status(200).send({ error: false, data: s3FileUrl });
    } catch (error) {
        res.status(500).send({ error: true, errorData: { error } });
    }
}

export const markAttendanceFromSheet = async (req: Request, res: Response) => {
    let filePath;
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        filePath = req.file.path;
        const date = new Date(req.body.date);
        const workbook = xlsx.readFile(filePath);
        const worksheet = workbook.Sheets.attendance;
        const jsonData: any = xlsx.utils.sheet_to_json(worksheet, { raw: false });

        let i = 0;
        while (i < jsonData.length) {
            const data = jsonData[i];
            const overtime = jsonData[i + 1];
            const user = await User.findOne({ user_id: data['Employee Id'] })
            if (user) {
                for (let id = 1; id < 32; id++) {
                    if (data[id]) {
                        date.setDate(id);
                        const prevAttendance = await DailyAttendance.findOne({ user: user._id, date });
                        if (prevAttendance === null) {
                            const attendance = new DailyAttendance({
                                user: user._id,
                                date,
                                status: data[id],
                                overtime: overtime[id]
                            });
                            console.log(attendance);
                            await attendance.save();
                        }
                    }
                }
            }
            i++;
        }
        res.status(200).send({ error: false, Message: "Attendance marked" });
    } catch (error) {
        res.status(500).send({ error: true, errorData: { error } });
    } finally {
        // Delete the uploaded file from the server's file system (whether the operation succeeded or failed)
        if (filePath) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    // Handle any error that occurs during file deletion
                    console.log("Error deleting the uploaded file:", err);
                } else {
                    // Debug message indicating successful file deletion
                    console.log("Uploaded file deleted successfully");
                }
            });
        }
    }
}