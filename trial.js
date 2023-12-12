const mongoose  = require('mongoose');
/*mongoose.connect("mongodb+srv://sayali21joshi:BSOInyNN6usdpMQB@cluster0.voozemb.mongodb.net/miniProject",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //bufferTimeoutMS: 20000 
}).then(
    () => {
        console.log("database connected");
    }
).catch(
    (err) => {
        console.log(err);
    }
);

//const User=require('./db.js');*/
const Job=require('./submitJob.js');

/*function searchAll(){
    var x= document.getElementById("display")
    Job.find()
    .foreach(function(doc) {
          console.log(doc.id, " => ", doc.data());
              display.innerHTML+=`
          <div class="card" style="width: 25rem";"border-radius: 15px" >
          <img class="card-img-top" src='${doc.data().images}'/>
          <div class="card-body">
            <h3 class="card-title" id="card-title">${doc.data().jobOrbusiness}</h3>
            <h4 class="card-text" id="card-text"><span class="glyphicon glyphicon-map-marker"></span>Location:${doc.data().location}</h4>
            <h3 class="card-text" id="card-name">Rs ${doc.data().ownername}</h3>
            <button  class="btn btn-primary"  data-toggle="modal" data-target="#product_view"  onclick="DisplayAdd('${doc.id}')">Request</button>
  
          </div>
          </div>
         `;
  
          })
} */