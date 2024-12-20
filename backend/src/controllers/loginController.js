const express = require('express');
const cors = require('cors');
const db = require('../..');
const login = db.login;
const signup = db.signup;
const Op = db.Sequelize.Op;
const nodemailer = require('nodemailer');


//configuring the nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',// Use any other mail domain e.g Yahoo, onedrive
    auth: {
        user: 'vg2556519@gmail.com',//Configure this with main email id
        pass: 'keza byrs orae udyl',//configure this with main email id password
    }
})

//Code for generating OTP
function generateOTP(){
    return Math.floor(100000+ Math.random() * 900000).toString();
}

// Function to check if email is registered
async function isEmailRegistered(email) {
    const registeredUser = await signup.findOne({ where: { stud_email:email } });
    if (registeredUser) {
        return true;
    }
    return false;
}

async function generateandStoreOTP(email){
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5*60*100);

    await login.upsert({
        email,
        otp,
        otp_expiry: otpExpiry,
    });

    console.log(`OTP for ${email}: ${otp}`);
    return otp;
} 


async function sendOTPEmail(email, otp){
    const mailOptions = {
        from: 'vg2556519@gmail.com',
        to: email,
        subject: 'YOUR OTP CODE',
        text: `Your OTP code is ${otp}. it will expire in 5 minutes`,
    };
    transporter.sendMail(mailOptions);
} 


async function verifyOTP(email, otp){
    const user = await login.findOne({ where: { email } });
    console.log("user this",user);
    if(!user){
        throw new Error(`User not found`);
    }
    console.log("exp",user.otp_expiry);
    console.log(new Date());
    if(user.otp === otp && (new Date() < new Date(user.otp_expiry))){
        return true;
    } else {
        throw new Error('Invalid OTP');
    }
}

module.exports = {
    generateandStoreOTP,
    isEmailRegistered, 
    sendOTPEmail,
    verifyOTP,
};