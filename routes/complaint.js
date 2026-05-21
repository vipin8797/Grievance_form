import express from "express";
import multer from "multer";
import { storage } from "../config/cloudConfig.js";
import Complaint from "../models/complaintSchema.js";
import { buildEmail } from '../config/mailFormateBuilder.js';
import { sendComplaintMail } from "../config/mailer.js";
import wrapAsync from "../utils/wrapAsync.js";
import { validateComplaint } from "../middleware/joiValidator.js";

const router = express.Router();
const upload = multer({ storage });

// Render form
router.get("/", (req, res) => {
    res.render("index.ejs");
});

// Post for form submission
router.post(
    "/submit",
    upload.array("evidenceFiles", 5),
    validateComplaint,
    wrapAsync(async (req, res) => {
        let evidenceUrls = [];

        // Direct URL
        if (req.body.evidenceUrl) {
            evidenceUrls.push(req.body.evidenceUrl.trim());
        }

        // Uploaded files URLS
        if (req.files && req.files.length > 0) {
            const uploadedUrls = req.files.map(file => file.path);
            evidenceUrls.push(...uploadedUrls);
        }

        const complaint = new Complaint({
            category: req.body.category,
            role: req.body.role,
            personal: {
                name: req.body.name?.trim(),
                fatherName: req.body.fatherName?.trim(),
                department: req.body.department?.trim()
            },
            academic: {
                programme: req.body.programme,
                batch: req.body.batch,
                semester: req.body.semester
            },
            contact: {
                address: req.body.address,
                state: req.body.state,
                city: req.body.city,
                pincode: req.body.pincode,
                contactNumber: req.body.contact
            },
            message: req.body.message?.trim(),
            evidence: evidenceUrls
        });

        await complaint.save();

        const mailText = buildEmail(complaint, evidenceUrls);
        sendComplaintMail(mailText);

        req.flash("success", "Complaint submitted successfully!");
        res.redirect("/");
    })
);

export default router;
