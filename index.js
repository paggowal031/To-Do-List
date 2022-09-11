const express=require('express');
const env=require('./config/environment');
const { dirname } = require('path');
const port=8000;

const db=require('./config/mongoose');
const Task=require('./models/task');

const app=express();



//setting up template engine ejs
const path=require('path');        //directory for views
app.set('view engine','ejs');      //setting value for view engine
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static(env.assest_path));



app.get('/',function(req,res){

    //fetching all task
    Task.find({},function(err,tasks){
       if(err){
           console.log("error in fetching tasks from database");
           return;
       }
       return res.render('home',{
        title:"Task List",
        task_list:tasks
     });

    });
  
});


app.post('/create-task',function(req,res){
    
    
    Task.create({
        description:req.body.description,
        category:req.body.category,
        date:req.body.date

    },function(err,newTask){
        if(err){
            console.log("Error creating a new task");
        return;
        }
        console.log("******",newTask);
        return res.redirect('back');
    });

    
}) ;

//deleting task
app.get('/delete-task',function(req,res){
     //get the id from the query from url
     let id=req.query.id;

     //find the task in the database using id and delete it
     Task.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting a task from the database");
        return;
        }

         return res.redirect('back');
     });
});
 



app.listen(port,function(err){

    if(err){
        console.log("Error in running server");
    }
    console.log("Server is running on port::",port);
});