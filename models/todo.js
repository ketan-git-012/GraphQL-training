const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxLength : 32 
    },
    isdone : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model("Todo", todoSchema);