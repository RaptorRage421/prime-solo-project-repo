const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
    const msg = {
        to,
        from: 'bookings.promodex@gmail.com', 
        subject,
        text,
        html: `<strong>${text}</strong>`,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent successfully', msg.html);
    } catch (error) {
        console.error('Error sending email:', error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
};

module.exports = sendEmail;