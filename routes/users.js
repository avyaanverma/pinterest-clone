var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var plm = require('passport-local-mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/pinterest");

var mongoose = require('mongoose');
var plm = require('passport-local-mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/pinterest");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        
    },
    dp:{
        type:String,
        
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts'
    }],
    email:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        
    }
})

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
UserSchema.plugin(plm);
module.exports = mongoose.model("User",UserSchema);