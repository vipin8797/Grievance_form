import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

/**
 * Sends a complaint email notification.
 * @param {string} mailText - The formatted text of the complaint.
 * @returns {Promise<void>}
 */
export async function sendComplaintMail(mailText) {
    const receiver = {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_TO,
        subject: "New Grievance Complaint Submitted",
        text: mailText
    };

    console.log("Attempting to send email...");

    try {
        const info = await transporter.sendMail(receiver);
        console.log("Email sent successfully:", info.messageId);
    } catch (error) {
        console.error("Failed to send email:", error);
        // We don't throw here to avoid failing the whole request if only mail fails,
        // but in a production app, we might want to log this to a monitoring service.
    }
}
