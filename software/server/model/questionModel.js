/**
 * Created by semanticbits on 21/9/16.
 */

var mongoose = require('mongoose');
var answerSchema=require('./answerModel');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var questionSchema= new Schema({
    id:ObjectId,
    t_id:ObjectId,
    question:String,
    rate:Number
});
var subjectModel=mongoose.model('question',questionSchema);
module.exports=subjectModel;


