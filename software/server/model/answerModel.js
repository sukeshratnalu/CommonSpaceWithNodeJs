/**
 * Created by semanticbits on 21/9/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
var answerSchema = new Schema({
    id:ObjectId,
    Q_id:ObjectId,
    answer:String,
    author:String,
    rate:Number,
    answeredDate:String


});
var answerModel = mongoose.model('answers', answerSchema);
module.exports=answerModel;
