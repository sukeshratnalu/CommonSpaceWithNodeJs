/**
 * Created by semanticbits on 3/10/16.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    email: String,
    password: String,
    role:String,
    token: String
});

module.exports = mongoose.model('User', UserSchema);
