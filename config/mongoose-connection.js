const mongoose = require('mongoose');
const dbgr = require("debug")("develpoment:mongoose")
const config = require('config')


mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
    dbgr("connected")
})
.catch(function(err){
   dbgr(err);
    
})

module.exports = mongoose.connection
