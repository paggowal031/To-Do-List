//reuire the library
const mongoose=require('mongoose');
const env=require('./environment');

//connect to the database
mongoose.connect(`mongodb://localhost/${env.db}`);

//aquire the connection {to check if it is successfull}
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,"Error connecting to database"));


//up and running successfully
db.once('open',function(){
    console.log("successfully connected to the database::MongoDB");
});



