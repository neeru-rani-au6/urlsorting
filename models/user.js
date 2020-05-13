var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var UserSchema = new Schema(
    {
        Name: {
        type: String,
        required: true,
        trim: true
      },
      EmailId: {
        unique: true,
        type: String,
        required: true,
        trim: true
      },
      Password: {
        type: String,
        required: true,
        trim: true
      },
      Address:{
          type:String,
          required:true
      },
      PhoneNo:{
          type:Number,
          required:true
      },
      date:{
        type:Date,
        default:Date.now
      },
      jwt:{
        type:String,
        required:false,
        default:null
      }
    }
     );


//DEFINE PRE METHOD TO HASH PASSWORD 
UserSchema.pre('save', function (next) {
    var user = this;
    if(user.isModified('Password')){
      bcrypt.hash(user.Password, 10)
    .then(function (hashedPassword) {
      console.log(hashedPassword);  
        user.Password = hashedPassword;
        next();

    })
    .catch((err)=>{
      next(err)
    })
    }
    else{
      next();
    }
    
  });
var user = mongoose.model("user", UserSchema);
module.exports = user;

