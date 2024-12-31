const nodemailer = require('nodemailer');
const db = require('../models/index');

const SENDMAIL = async (mailDetails, callbacks) => {
    try{
        const info = await transporter.sendMail(mailDetails);
        callbacks(info);
    } catch (error) {
        console.log(error);
    }
};

module.exports = SENDMAIL; 