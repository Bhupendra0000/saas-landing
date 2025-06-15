const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');

router.post('/signup', async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = new User({ name, email });
        await user.save();

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thanks for Signing Up!',
            text: `Hi ${name}, thanks for signing up. We'll contact you soon!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
        });

        res.json({ message: 'Signup successful! Check your email.' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
