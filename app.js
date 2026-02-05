// Requiring Dependencies
import 'dotenv/config';
import express from "express";
import path from "path";
import morgan from "morgan";
import methodOverride from "method-override";
import { fileURLToPath } from "url";
import multer from "multer";

import nodemailer from "nodemailer";

// Requiring Files
import connectDb from './config/dbConnect.js';
import Complaint from "./models/complaintSchema.js";
import {storage} from "./config/cloudConfig.js";
import { buildEmail } from './config/mailFormateBuilder.js';
import { sendComplaintMail } from "./config/mailer.js";
import {validateComplaint} from "./middleware/joiValidator.js";

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
const upload = multer({ storage })



// Test route
app.get("/", (req, res) => {
    res.render("index.ejs");
});


// //Get all Complaints
// app.get("/all",async(req, res)=>{
//     console.log("USER:", process.env.MAIL_USER);
// console.log("PASS:", process.env.MAIL_PASS);

//     try {
//         const auth = nodemailer.createTransport({
//             service:"gmail",
//             secure:true,
//             port:456,
//             auth:{
//                 user:"cy7795151@gmail.com",
//                 pass:"ifvegspmksbaczeh"
//             }
//         });

//         const receiver = {
//             from:"cy7795151@gmail.com",
//             to:"cy7795151@gmail.com",
//             subject:"Hello",
//             text:"this is data."
//         };
// console.log("Sending email...");
//         auth.sendMail(receiver,(error,emailRespone)=>{
//             if(error){
//                 console.log(error);
        
//             }console.log("sent")
//         })
  


//   console.log("Email sent:", );

// } catch (err) {
//   console.error("Mail error:", err);
// }

// });


//POST for form
app.post(
  "/submit",
  upload.array("evidenceFiles", 5),
  
  async (req, res) => {

    try {

      let evidenceUrls = [];

      //  direct URL
      if (req.body.evidenceUrl) {
        evidenceUrls.push(req.body.evidenceUrl.trim());
      }

      // uploaded files URLS 
      if (req.files && req.files.length > 0) {
        const uploadedUrls = req.files.map(file => file.path);
        evidenceUrls.push(...uploadedUrls);
      }

       console.log(evidenceUrls);
      // ---- create complaint ----
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


      //saving in db.
      await complaint.save();

      //creating email to be sent
      const mailText = buildEmail(complaint, evidenceUrls);
      sendComplaintMail(mailText);
      res.send("User will be redirected to home page after this.");;

    } catch (err) {

      console.error(err);
      res.status(500).send("Submission failed",err);

    }
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
