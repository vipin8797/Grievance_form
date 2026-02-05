import nodemailer from "nodemailer";

export function sendComplaintMail(mailText) {

    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const receiver = {
        from: process.env.MAIL_USER,
        to: "vy879736@gmail.com",
        subject: "Grievance Complain",
        text: mailText
    };

    console.log(" Sending email...");

    auth.sendMail(receiver, (error, response) => {

        if (error) {
            console.log(" Mail error:", error);
            return;
        }

        console.log(" Mail sent");

    });

}
