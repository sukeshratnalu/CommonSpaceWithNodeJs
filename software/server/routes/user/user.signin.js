/**
 * Created by semanticbits on 4/10/16.
 */
var userSignIn = function(app,User,jwt){
    app.post('/signin', function(req, res) {
        console.log('Hi i m in sign in');
        User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
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
                    userModel.save(function(err, user) {
                        console.log('generating token');
                        console.log(user);
                        user.token = jwt.sign(user, 'shhhhh');
                        console.log(user.token);
                        user.save(function(err, user1) {
                            res.json({
                                type: true,
                                data: user1,
                                token: user1.token
                            });
                        });
                    })
                }
            }
        });
    });
};
module.exports=userSignIn;
