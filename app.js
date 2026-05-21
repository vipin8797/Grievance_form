// Requiring Dependencies
import 'dotenv/config';
import express from "express";
import path from "path";
import morgan from "morgan";
import methodOverride from "method-override";
import { fileURLToPath } from "url";
import multer from "multer";
import session from "express-session";
import flash from "connect-flash";

import nodemailer from "nodemailer";

// Requiring Files
import connectDb from './config/dbConnect.js';
import Complaint from "./models/complaintSchema.js";
import {storage} from "./config/cloudConfig.js";
import { buildEmail } from './config/mailFormateBuilder.js';
import { sendComplaintMail } from "./config/mailer.js";
import {validateComplaint} from "./middleware/joiValidator.js";
import ExpressError from "./utils/ExpressError.js";
import complaintRouter from "./routes/complaint.js";

// dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


// Middleware
app.use(morgan(':method :url :response-time'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "secretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Routes
app.use("/", complaintRouter);


// 404 handler
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).send(message);
});


// Start server
const PORT = process.env.PORT || 3000;

connectDb()
.then(() => {
    app.listen(PORT, () => {
        console.log(`listening at ${PORT}`);
    });
})
.catch(console.log);
