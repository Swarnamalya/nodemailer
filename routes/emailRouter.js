var express=require('express');
var bodyParser = require('body-parser')// importing body parser middleware to parse form content from HTML
var cors = require('./../cors');
const emailRouter = express.Router();
var nodemailer = require('nodemailer');//importing node mailer


emailRouter.route('/')
.options(cors.cors,(req,res)=>{
    console.log("Coming email here");
    res.sendStatus(200);
})

// route which captures form details and sends it to your personal mail
.post(cors.cors,(req,res,next)=>{
  
  console.log("oooo",req.body)
  /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
    here we are using gmail as our service 
    In Auth object , we specify our email and password
  */
    // var transporter = nodemailer.createTransport("SMTP", {
    //     host: "smtp-mail.outlook.com",
    //     secureConnection: false, 
    //     port: 587, 
    //     auth: {
    //         user: "swarnab@trymool.ai",
    //         pass: "Donut&Jillu@112"
    //     },
    //     tls: {
    //         ciphers:'SSLv3'
    //     }
    // });

  /*
    In mail options we specify from and to address, subject and HTML content.
    In our case , we use our personal email as from and to address,
    Subject is Contact name and 
    html is our form details which we parsed using bodyParser.
  */
//   var mailOptions = {
//     from: req.body.email,//replace with your email
//     to: 'swarnamalya.balaji@gmail.com',//replace with your email
//     subject: `NodeMail Testing`,
//     html:`Node Mail Testing Sucessful`
//   };
  
  /* Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
   call back as parameter 
  */

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//       res.send('error') // if error occurs send error as response to client
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
//     }
//   });
var nodeoutlook = require('nodejs-nodemailer-outlook');
nodeoutlook.sendEmail({
    auth: {
        user: "trymoolai@outlook.com",
        pass: "Admin@moolai"
    },
    from: 'trymoolai@outlook.com',
    to: 'trymoolai@outlook.com',
    subject: 'Message from  '+req.body.fullname+' ('+req.body.email+') ',
    html: '<b>Full Name: </b>'+req.body.fullname+'<br><b>Email: </b>'+req.body.email+'<br><b>Company / Business Name: </b>'+req.body.companyname+'<br><b>Phone number: </b>'+req.body.phonenumber+'<br><b>Message:</b> '+req.body.message+'<br><b>Preferred mode of contact:</b> '+req.body.email_phone,
    text: 'This is text version!',
    replyTo: req.body.email,
    onError: (e) => {console.log("Error from router: ",e); res.send(e);},
    onSuccess: (i) => {console.log("Success from router: ",i); res.send(i);}
}


);
})


module.exports = emailRouter;