const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine','ejs');
let items =["Buy Groceries","Cook Dishes","Eat Food"];
let workitems = [];

app.get("/" , function(req,res){

    let today = new Date();
    let options = {
        weekday:"long",
        day:"numeric",
        month:"long",
    }
    let day = today.toLocaleDateString("en-US", options);
    // var currentDay = today.getDay();
    // var currentDate = today.getDate();
    // var currentMonth = today.getMonth()+1;
    // var currentYear = today.getFullYear();
    // var day = "";
    // switch (currentDay) {
    //     case 0:
    //         day = "sunday";
    //         break;
    //         case 1:
    //         day = "monday";
    //         break;
    //         case 2:
    //         day = "tuesday";
    //         break;
    //         case 3:
    //         day = "wednesday";
    //         break;
    //         case 4:
    //         day = "thursday";
    //         break;
    //         case 5:
    //         day = "friday";
    //         break;
    //         case 6:
    //         day = "saturday";
    //         break;
    
    //     default:
    //         console.log("Error");
    //         break;

    // }
    res.render("list",{listtitle:day, newitem: items});
});
app.post("/",function(req,res){
     let item = req.body.Additem;
    items.push(item);
    res.redirect("/");
    
});
app.post("/work",function(req,res){
    let item = req.body.Additem;
    if(req.body.list === "work"){
        workitems.push(item);
        res.redirect("/work");
    }else{
    items.push(item);
    res.redirect("/work");
    }
});

app.get("/work",function(req,res){
    res.render("list",{listtitle: "work list",newitem:workitems})
});

app.get("/about",function(req,res){
    res.render("about");
})

app.listen(3000 , function(){
    console.log("Server Started at 3000");
});