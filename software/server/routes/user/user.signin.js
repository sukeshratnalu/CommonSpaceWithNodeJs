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
    app.post('/user/forgotPassword',function(req,res){
        User.find({email:req.body.username},function(err,data){
            if(err){
                console.log('Error :'+err)
            }

            else {
                if(data.length>0){


                    res.json({data:data,status:true});
                }
                else {
                    res.json({data:data,status:false});
                }

            }
        })
    });
    app.post('/user/changePassword',function(req,res){
        console.log('ChangePassword server side');
        console.log(req.body);
        User.find({email:req.body.userName},function(err,data){
            if(err){
                console.log('Error :'+err)
            }
            else {
                if(data.length>0){


                    User.update(
                        { email:req.body.userName },
                        {
                            password : req.body.password
                        },
                        { upsert: true },function(err,data){
                            if(err){
                                console.log(err);
                            }
                            else {
                                console.log(data);
                                res.send(data);
                            }
                        }
                    )
                }
                else {
                    res.send(err);
                }

            }
        })

    });
    app.post('/user/forgotPasswordMail',function(req,res){
        console.log('starting mail operation');

        var content='<b>Hi,<br>&nbsp;&nbsp;You recently requested to reset your password for Common Space account.<br> Click the below link for reset it:http://127.0.0.1:3500/#/changePassword<br><br><br>Thank you.</b>'

        var mailOptions = {
            from: '"Common Space" <sukeshkumar017@gmail.com>', // sender address
            to: req.body.username,  // list of receivers
            subject: 'Notification ✔', // Subject line
            text: 'Your added to Common Space. Now you can see all topics', // plaintext body
            html: content
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log('error accured');
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            res.json({status:true});
        });
    })
};
module.exports=userSignIn;
