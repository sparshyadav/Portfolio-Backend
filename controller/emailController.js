const transporter = require("../config/mailer");
const generateEmailTemplate = require('../template/emailTemplate.js');

const sendEmail = async (req, res) => {
    console.log("Request.body:", req.body);
    
    const { 
      fullName, 
      company, 
      email, 
      phone, 
      profileUrl, 
      reason, 
      meetingDate, 
      jobLink, 
      employmentType, 
      additionalInfo 
    } = req.body;
    
    if (!fullName || !email) {
      return res.status(400).json({ error: "Name and email are required!" });
    }
    
    if (!reason || reason.length === 0) {
      return res.status(400).json({ error: "Please select at least one reason for contact" });
    }
    
    try {
      const htmlContent = generateEmailTemplate({
        fullName,
        company,
        email,
        phone,
        profileUrl,
        reason,
        meetingDate,
        jobLink,
        employmentType,
        additionalInfo
      });
      
      const mailOptions = {
        from: process.env.EMAIL,
        to: "sparshyadavmrt@gmail.com",
        subject: "New Contact Form Submission",
        html: htmlContent,
      };
      
      await transporter.sendMail(mailOptions);
      
      return res.status(200).json({ message: "Your message has been sent successfully!" });
    } catch (error) {
      console.error("Email sending error:", error);
      return res.status(500).json({ error: "Failed to send email. Please try again later." });
    }
  };
  
  module.exports = { sendEmail };