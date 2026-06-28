import nodemailer from 'nodemailer';

// Create a transporter for Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider
    auth: {
        user: 'testcaseouss@gmail.com', // Your email
        pass: 'testcase123' // Your email password
    }
});

export async function sendPasswordResetEmail(to, token) {
    const mailOptions = {
        from: 'yourEmail@gmail.com',
        to: to,
        subject: 'Password Reset Request',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
            `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
            `http://<your_frontend_address>/reset-password/${token}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent');
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
}
