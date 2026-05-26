# 🏫 Starex Grievance & Redressal Portal

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-v5.x-lightgrey.svg)](https://expressjs.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-v8.x-red.svg)](https://mongoosejs.com/)

A premium, highly secure, and responsive web application designed for Starex University students and staff members to seamlessly file grievances and track their review processes. Built with clean, modern design standards featuring **glassmorphism**, dynamic UI validations, automated email notifications, and cloud-backed evidence uploads.

---

## ✨ Features

- **🌐 Sleek Brand Design**: Brand-aligned colors, Google Font integration (Inter), elegant glassmorphism containers, hover scale transitions, and responsive grid layouts.
- **🌓 Dynamic Dark Mode**: Implemented via global CSS overrides, complete with a floating toggle button, dynamic prefers-color-scheme detection, and localStorage state persistence.
- **📂 Custom File Dropzone**: Formatted as a dashed premium upload area showing real-time listings of selected file names and sizes before form submission.
- **📧 Complainant Email Integrations**: Optional email collection that syncs into Mongoose schemas, Joi email format validations, and custom Nodemailer body templates.
- **📱 Pincode & Contact Regex Masks**: Interactive client-side filters preventing invalid input types during entry and strict regex pattern matchers on the server-side.
- **🔗 Direct Evidence Links**: Paste hotlinks/URLs directly to attach files easily.
- **🛡️ Dynamic Form Toggling**: Interactive client-side fields tailored for "Student" vs "Staff" roles dynamically adjusting layout spaces.
- **🔔 Live Validations & Counters**: Micro-interaction elements showing real-time feedback (character counter, max file limits, and input focus shadow rings).
- **🚀 Advanced Double-Submission Shield**: Submit button transitions to a dynamic loading state with spin indicators upon form submission, preventing double records.
- **📬 Nodemailer Auto-Alerts**: Instantly constructs rich text emails using standard builders and sends them to admin panels.
- **💥 Glassmorphic Error/404 Handlers**: Elegant EJS templates handling errors and invalid endpoints professionally with click-backs to the home dashboard.
- **scrollbar Styling**: Custom glassmorphic scrollbars built directly using Webkit engines to look gorgeous in both dark and light modes.

---

## 📂 Project Architecture

```text
Grievance_form/
├── config/
│   ├── cloudConfig.js         # Cloudinary storage engine integration
│   ├── dbConnect.js           # Mongoose MongoDB connection pooling
│   ├── envValidate.js         # Startup checks for mandatory env vars
│   ├── mailer.js              # Nodemailer transporter and mail options
│   └── mailFormateBuilder.js  # Rich templates for complaint emails
├── middleware/
│   └── joiValidator.js        # Server-side validation schema runner
├── models/
│   ├── complaintSchema.js     # Mongoose complaint definition
│   └── joiSchema.js           # Joi validation ruleset
├── public/
│   ├── main.js                # Interactive client-side controller
│   └── style.css              # Custom styled CSS variables & transitions
├── routes/
│   └── complaint.js           # Routing endpoints for forms and post actions
├── utils/
│   ├── ExpressError.js        # Standard application error handler class
│   └── wrapAsync.js           # Async route wrapper avoiding try-catches
├── views/
│   ├── includes/
│   │   └── flash.ejs          # Cohesive EJS success & danger flash boxes
│   ├── error.ejs              # Custom styled EJS dynamic error fallback
│   └── index.ejs              # Beautiful glassmorphic main entry form
├── .gitignore                 # Custom rules for environments, IDEs, and OS
├── app.js                     # Main application entry point
├── package.json               # Package setup and dependencies registry
└── README.md                  # Comprehensive technical documentation
```

---

## ⚙️ Quick Installation

### 1. Clone & Position
```bash
git clone <repository-url>
cd Grievance_form
```

### 2. Dependency Setup
```bash
npm install
```

### 3. Configure Environments
Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAIL_USER=your_gmail_address
MAIL_PASS=your_gmail_app_password
MAIL_TO=recipient_panel_address
```

### 4. Run Locally
```bash
# Runs nodemon on node app.js
npm start
```
The server will boot and print out the local clickable link: `http://localhost:3000`

---

## 📄 License

This project is licensed under the **ISC License**. Created with excellence for the Starex Grievance System.
