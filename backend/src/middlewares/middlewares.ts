import bcrypt from "bcryptjs";

export async function hashUserPassword(this: any, next: Function) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
}