var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require('mongoose');
var Trip = require('./trip');
var myTrips;
var port = process.env.PORT || 3000;
const app = express();


    mongoose.connect('mongodb://shahartrip:shahar92@ds031571.mlab.com:31571/trips', { useNewUrlParser: true } , (err)=>{
        if (err){
            console.error("failed connectd to db!!");
            console.log(err);
        }   else{
            console.log("connected successfully!!");
            
        }
    });    


app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/trips" , (req,res)=>{

    console.log("This Is ====>    Get All");
    
    Trip.find({} , (err , trips)=>{
        myTrips = trips;
        res.send(trips);
    })
})
app.post("/trips" , (req,res)=>{
    console.log("This Is ====>    Create new ");
      let requestTrip =  req.body;
      console.log("The Json We Git From USer IS:");
      console.log(requestTrip);
      
          Trip.create(requestTrip , (err , newTrip)=>{
              if(err)console.log(err);
              else{
                 res.send(newTrip);
              }  
          })
})
app.get("/trips/:id" , (req,res)=>{
    console.log("This Is ====>    DELETE");
    console.log( "The Body is:" + req.params.id);
  Trip.find({timestamp:req.params.id} , (err , arrayOfTrips)=>{
      if(!!arrayOfTrips && !!arrayOfTrips[0] && !!arrayOfTrips[0]._id ){
        let trip = arrayOfTrips[0];
        Trip.findByIdAndDelete(trip._id , (err )=>{
            if(err){
                console.log(err);
            }else{
                console.log("no error"); 
                res.send("deleted");
            }
        })
      }else{
            console.log("no ID");
            res.send("Not deleted");
            
      }   
  })
})

app.get("*", function (req, res) {

    console.log("SomeOne hit the star Route");
    
    res.send("you hit the * route");
});

console.log(`The Port is:  ${port}` );
app.listen( port ,function (req, res) {
      
    console.log("server up!");
    
} );
