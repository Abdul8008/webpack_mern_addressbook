const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');
//modals
const User = require('../modals/userSchema');
//crypto
const crypto = require('crypto');
//mail
const nodemailer =  require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        // api_key: "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"
        api_key: process.env.MAILER_KEY
    }
}));

//post signup
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    //check whether all fields are present    
    if (!name || !email || !password) {
        return res.status(422).json({
            error: 'Please add all the fields'
        })
    }
    //find same email
    User.findOne({ email })
        .then(savedUser => {
            if (savedUser) {
                return res.status(422).json({
                    error: 'User is already registered.'
                })
            }
            //hashed password
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    //save user
                    const newUser = new User({ name, email, password: hashedPassword })
                    newUser.save()
                        .then(user => {
                            transport.sendMail({
                                to:user.email,
                                from:"sakarim9124@gmail.com",
                                subject:"signup succesfully",
                                html:`<p>Welcom to sakarim9124.com.Hello <strong>${ user.name }</strong>, your email-id is <strong>${ user.email }</strong> and password is <Strong>${ password }</strong></p>
                                ` 
                            })
                            res.status(200).json({
                                message: 'User saved succesfully.',
                            })
                        }).catch(err => console.log(err, ' error'))
                }).catch(err => console.log(err, ' outer err'))
        })
})
//post signin
router.post('/signin', (req, res) => {
    const { email, password } = req.body
    //check whether all fields are present    
    if (!email || !password) {
        return res.status(422).json({
            error: 'Please add all the fields'
        })
    }
    //check whether user email is there
    User.findOne({ email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({
                    error: 'Please Check email or password.'
                })
            }
            bcrypt.compare(password, savedUser.password)
                .then(isMatch => {
                    if (isMatch) {
                        const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                        //
                        savedUser.password = undefined
                        return res.status(200).json({
                            message: 'Signed In succesfully.',
                            token,
                            user: savedUser
                        })
                    }else {
                        return res.status(400).json({
                            error: 'Please check email or password',
                        })
                    }
                }).catch(err => console.log(err, ' signin error'))
        }).catch(err => console.log(err, ' signin out errr'))
})

router.post('/forgotpassword', (req, res) => {
    crypto.randomBytes(32, (err, buf) => {
        if(err){
            console.log(err, ' err')
        }
        const miliSec = hr => {
            return `${ hr * 60 * 60 *1000 }`;
        }
        const token = buf.toString('hex')
        User.findOne({ email: req.body.email })  //
            .then(user => {
                if(!user){
                    return res.status(422).json({
                        error: "User with this email is not exist."
                    })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                // user.expireToken = Date.now() + miliSec(1)

                user.save()
                    .then(result => {
                        transport.sendMail({
                            to:user.email,
                            from:"sakarim9124@gmail.com",
                            subject:"Reset Password",
                            html:`
                            <h4>Hi,</h4>
                            <p>Seems like you forgot your password for your Address Book. If it's true, click on below to reset your password.</p>
                            
                            <div style=" margin: 20px 0 ">
                                <a style=" padding: 10px 20px; text-decoration: none; background: #4CAF50; color: white " href="http://localhost:8080/reset/${token}">Reset Password</a>
                            </div>

                            <span>If you did not forgot your passowrd you can safely ignore this mail.</span>
                            <p style=" margin: 15px 0 ">Thanks & Regards</p>
                            
                            <p>Address Book</p>
                            ` 
                        })
                        res.status(200).json({
                            message: "Succesfully sent reset mail in your email id. Please Check"
                        })
                    })
            })
    })
})

router.post('/updatepassword', (req, res) => {
    const newPassword = req.body.password
    const rcvToken = req.body.token

    User.findOne({ resetToken: rcvToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if(!user){
                res.status(400).json({
                    error: "Session is expired, try again."
                })
            }
            bcrypt.hash(newPassword, 12)
                .then(hashedPassword => {
                    user.password = hashedPassword
                    user.resetToken = undefined
                    user.expireToken = undefined

                    user.save()
                        .then(result => {
                            // console.log(result, ' resss')
                            // console.log(user, ' userrrrr')
                            transport.sendMail({
                                to:user.email,
                                from:"sakarim9124@gmail.com",
                                subject:"password changed succesfully",
                                html:`<p>Hello <strong>${ user.name }</strong>, your email-id is <strong>${ user.email }</strong> and new password is <Strong>${ newPassword }</strong></p>
                                ` 
                            })
                            res.status(200).json({
                                message: "Password updated succesfully."
                            })
                        }).catch(err => console.log(err, ' err'))
                }).catch(err => {
                    console.log(err, ' out errr')
                })
        })
})

module.exports = router