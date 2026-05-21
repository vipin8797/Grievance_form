# Starex Grievance Form

A professional web application for submitting and managing grievances and complaints. Built with Node.js, Express, and MongoDB, featuring automated email notifications and cloud-based file uploads.

## 🚀 Features

- **Multi-category Complaints:** Support for General, Ragging, Caste Discrimination, Sexual Harassment, etc.
- **Role-based Forms:** Tailored fields for students and staff.
- **Evidence Uploads:** Integrated with Cloudinary for secure file storage.
- **Automated Emailing:** Instant notifications sent via Nodemailer upon submission.
- **Validation:** Robust client-side and server-side validation using Joi.
- **Responsive Design:** Mobile-friendly UI built with Bootstrap 5.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Templating:** EJS
- **File Storage:** Cloudinary
- **Email:** Nodemailer
- **Validation:** Joi
- **Logging:** Morgan

## ⚙️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Grievance_form
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAIL_USER=your_gmail_address
   MAIL_PASS=your_gmail_app_password
   MAIL_TO=recipient_email_address
   ```

4. **Start the application:**
   ```bash
   npm start
   ```

## 📄 License

This project is licensed under the ISC License.
