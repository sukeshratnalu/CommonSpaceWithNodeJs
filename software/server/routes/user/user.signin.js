/**
 * Created by semanticbits on 4/10/16.
 */
var userSignIn = function(app,User,jwt){
    var nodemailer = require('nodemailer');
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sukeshkumar017@gmail.com', // Your email id
            pass: '8895048246' // Your password
        }
    });
    app.post('/signin', function(req, res) {
        User.findOne({email: req.body.email}, function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    res.json({
                        type: false,
                        data: "User already exists!"
                    });
                } else {
                    var userModel = new User();
                    userModel.email = req.body.email;
                    userModel.password = req.body.password;
                    userModel.role=req.body.role;
                    userModel.save(function(err, user) {
                        user.token = jwt.sign(user,'shhhhh');
                        user.save(function(err, user1) {
                            res.json({
                                type: true,
                                data: user1,
                                token: user1.token
                            });
                        });
                    });
                    console.log('starting mail operation');
                    // setup e-mail data with unicode symbols
                    var mailOptions = {
                        from: '"Common Space" <sukeshkumar017@gmail.com>', // sender address
                        to: req.body.email,  // list of receivers
                        subject: 'Notification ✔', // Subject line
                        text: 'Your added to Common Space. Now you can see all topics', // plaintext body
                        html: '<b>Hi,<br>&nbsp;&nbsp;Your sucessfully registered to Common Space.<br> Now you can see all topics:http://127.0.0.1:3500<br>Thank you</b>' // html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log('error accured');
                            return console.log(error);
                        }
                        console.log('Message sent: ' + info.response);
                    });

                }
            }
        });
    });
};
module.exports=userSignIn;
