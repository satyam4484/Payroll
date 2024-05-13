import attendanceModel from "../models/attendance.model";

export async function saveAttendanceCount(this: any, next: Function) {
    try {
        let attendance = await attendanceModel.Attendance.findOne({ user: this.user });
        if (attendance) {
            let newCount: number = attendance.total + 1;
            if (this.date.getMonth() != attendance.date.getMonth()) {
                newCount = 1;
            } else if (this.date.getDate() === attendance.date.getDate()) {
                newCount = newCount - 1;
            }
            await attendanceModel.Attendance.findByIdAndUpdate(attendance._id, { $set: { total: newCount, date: this.date } })
        } else {
            attendance = new attendanceModel.Attendance({ total: 1, date: this.date, user: this.user })
            attendance.save()
        }
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }

}