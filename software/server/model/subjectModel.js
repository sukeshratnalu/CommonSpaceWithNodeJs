/**
 * Created by semanticbits on 21/9/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var subjectSchema= new Schema({
    id:ObjectId,
    topicName:String
});
var subjectModel=mongoose.model('subjects',subjectSchema);
module.exports=subjectModel;
