var mongoose = require('mongoose');
var shortId = require('shortid');
var Schema = mongoose.Schema;
var UrlSchema = new Schema({
    
        full:{
            type:String,
            required:true
        },
        short:{
            type:String,
            required:true,
            default:shortId.generate
        },
        click :{
            type:Number,
            required:true,
            default:0
        }
    })

var Url = mongoose.model("Url", UrlSchema);
module.exports = Url;