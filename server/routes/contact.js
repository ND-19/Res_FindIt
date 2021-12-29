const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

const contactEmail = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "nityanshdoshi2001@gmail.com",
    pass: "********",
  },
  tls: {
      rejectUnauthorized: false
  }
});


// contactEmail.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready to Send");
//   }
// });


const Contact = (email, message) => {
    // const email = req.body.email
    // const mes = req.body.message

    const mail = {
      from: "FindIt",
      to: email,
      subject: "Thanks for Booking on FindIt",
      html: `<p>Message: ${message}</p>`,
    };
  
    contactEmail.sendMail(mail, function(error, res){
      if(error){
          console.log(error);
      }else{
          res.send('"Success');
      }
    })
  }



module.exports = Contact