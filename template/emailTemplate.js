const generateEmailTemplate = (data) => {
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
  } = data;

  const formattedReasons = reason.map(r => `<li>${r}</li>`).join('');

  const formattedEmploymentTypes = employmentType && employmentType.length > 0
    ? `<p><strong>Employment Type:</strong></p><ul>${employmentType.map(t => `<li>${t}</li>`).join('')}</ul>`
    : '';

  const formattedAdditionalInfo = additionalInfo && additionalInfo.length > 0
    ? `<p><strong>Additional Information Requested:</strong></p><ul>${additionalInfo.map(i => `<li>${i}</li>`).join('')}</ul>`
    : '';

  const formattedMeetingDate = meetingDate
    ? `<p><strong>Requested Meeting Date:</strong> ${new Date(meetingDate).toLocaleString()}</p>`
    : '';

  const formattedJobLink = jobLink
    ? `<p><strong>Job/Project Link:</strong> <a href="${jobLink}">${jobLink}</a></p>`
    : '';

  return `
  <html>
    <head>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #4f46e5;
          color: white;
          padding: 15px;
          border-radius: 5px 5px 0 0;
        }
        .content {
          border: 1px solid #ddd;
          border-top: none;
          padding: 20px;
          border-radius: 0 0 5px 5px;
        }
        h2 {
          margin-top: 0;
        }
        ul {
          margin-top: 5px;
        }
        .footer {
          margin-top: 30px;
          padding-top: 15px;
          border-top: 1px solid #ddd;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>New Contact Request</h2>
      </div>
      <div class="content">
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not specified'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not specified'}</p>
        <p><strong>LinkedIn Profile URL:</strong> ${profileUrl ? `${profileUrl}` : 'Not specified'}</p>
        
        <p><strong>Contact Reason(s):</strong></p>
        <ul>
          ${formattedReasons}
        </ul>
        
        ${formattedMeetingDate}
        ${formattedJobLink}
        ${formattedEmploymentTypes}
        ${formattedAdditionalInfo}
        
        <div class="footer">
          <p>This message was sent from your contact form on ${new Date().toLocaleDateString()}.</p>
          <p>Best Regards,</p>
          <p>Sparsh Yadav Portfolio</p>
        </div>
      </div>
    </body>
  </html>`;
};

module.exports = generateEmailTemplate;