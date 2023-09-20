import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'stmp.zoho.com',
  port: 465,
  secure: true,
  service: 'zoho',
  auth: {
    user: process.env.EMAIL_AUTH,
    pass: process.env.EMAIL_AUTH_PASSWORD,
  },
})

export default  transporter
