import { Document } from "mongoose"


const emailData = {

  // welcome: (user: ) => ({
  //   from: process.env.EMAIL_SENDER,
  //   to: user?.email,
  //   subject: 'Welcome',
  //   html: `<h1>Hi ${user?.firstname} you are welcome to ultimatecoins</h1>
  //                   <p>We are happy to see you</p>
  //                   <p>Make your life changing investment and enjoy while sit at home</p>
  //                   <br/>
  //                   <small> © ${new Date().getFullYear()}
  //                  <a href="https://donnybook.netlify.app">Donnybook</a> All Rights
  //                 Reserved</small>
                  
  //            `,
  // }),

  passwordforgot: (email: string, token:string) => ({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'password reset instructions',
    html: `<h1>follow this bellow link to reset your password</h1>
    <a href="https/donnybook.netlify.app/auth/reset/${token}">Reset Password </a>
                    <p>if you did not do this, kindly contact our support team</p>
                     <p>Time ${new Date()}</p>
                    <br/>
                    <small> © ${new Date().getFullYear()}
                   <a href="https://donnybook.netlify.app">Donnybook</a> All Rights
                  Reserved</small>
             `,
  }),
  passwordReset: (email: string) => ({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'password Update',
    html: `<h1>Your password has been successfully changed</h1>
                    <p>if you did not do this, kindly contact our support team</p>
                     <p>Time ${new Date()}</p>
                    <br/>
                    <small> © ${new Date().getFullYear()}
                   <a href="https://donnybook.netlify.app">Donnybook</a> All Rights
                  Reserved</small>
             `,
  }),
  // profileUpdate: (user: DocumentData) => ({
  //   from: process.env.EMAIL_SENDER,
  //   to: user?.email,
  //   subject: 'profile Update',
  //   html: `<h1>${user.firstname} you have updated your profile</h1>
  //                   <p>if you did not do this, kindly contact our support team</p>
  //                    <p>Time ${new Date()}</p>
  //                   <br/>
  //                   <small> © ${new Date().getFullYear()}
  //                  <a href="https://donnybook.netlify.app">Donnybook</a> All Rights
  //                 Reserved</small>
  //            `,
  // }),

  contacts: (user: any) => ({
    from: process.env.EMAIL_SENDER,
    to: user?.email,
    subject: 'Contact Notification',
    html: `<h1>${user.name} thank you for contacting us</h1>
                    <p>We will get back to you soon.</p>                   
                    <br/>
                    <small> © ${new Date().getFullYear()}
                  <a href="https://donnybook.netlify.app">Donnybook</a> All Rights
                  Reserved</small>
             `,
  }),
  // contactsForAdmin: (user: ) => ({
  //   from: process.env.EMAIL_SENDER,
  //   to: process.env.TO,
  //   subject: 'Contact Notification',
  //   html: `<h1>${user?.name} just contacted you</h1>
  //                   <p>Login now and check it out</p>                   
  //                   <br/>
  //                   <small> © ${new Date().getFullYear()}
  //                  <a href="https://donnybook.netlify.app">Donnybook</a> All Rights
  //                 Reserved</small>
  //            `,
  // }),
  newsLetters: (email: string) => ({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'Newsletter',
    html: `<h1>Thank you for subscribing for our newsletter</h1>
                    <p>We will reach out to you if there is any information</p>                   
                    <br/>
                    <small> © ${new Date().getFullYear()}
                  <a href="https://donnybook.netlify.app">Donnybook</a> All Rights
                  Reserved</small>
             `,
  }),



}

export default emailData
