
const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const multer = require('multer');
const path=require('path');

//app.use(express.json());
//app.use(express.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://sayali21joshi:BSOInyNN6usdpMQB@cluster0.voozemb.mongodb.net/miniProject",{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(
    () => {
        console.log("database connected");
    }
).catch(
    (err) => {
        console.log(err);
    }
);
const port= 3000;
const User=require('./db.js');
const Job=require('./submitJob.js');
require('./script.js');
app.get('/', (req, res) => {
   //return res.redirect('index.html');
   res.send('index');
})
app.get('/login', (req, res) => {
    //return res.redirect('login.html');
    res.send('login.html');
})
app.get('/register', (req, res) => {
   // return res.redirect('register.html');
    res.send('register.html');
})
app.post('/login', async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
     // console.log(db.collection('users'));
      // Perform further validation or authentication logic
      const user=await User.findOne({email: email});
      console.log(user);
            if(user===null){
                console.log('email does not exist');
            }
           // else if (err) throw(err);
            if(user.password===password){
                console.log("login success");
                return res.redirect('index.html');
            }
            else{
                console.log('password is incorrect,email:',email,'password:',password);
                res.send("password is incorrect");
            }
      //console.log({'email': email, 'password': password});

    } catch (error) {
      console.log({ error });
    }
  });

  app.post('/register', async (req, res) => {
    try {
      const password = req.body.password;
      const cpassword = req.body.confirmpassword;
     // console.log(req.body.username,password,cpassword)
      //res.send(req.body.username);
      // Perform further validation or authentication logic
        if(password===cpassword){
            const registerUser = new User({
                name: req.body.username,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            })

           const registered=await registerUser.save();
           console.log(registered);
           res.redirect('login.html')
        }
        else{
            console.log("passwords do not match");
            res.send("passwords do not match");
        }
      //console.log({'email': email, 'password': password , 'name': name});
    } catch (error) {
      console.log({ error });
    }
  });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/uploads'))
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now()+ '-' +file.originalname )
    }
});
 
const upload = multer({ storage: storage });

  app.get('/submitJob', async(req, res) => {
    let conn=await connect();
    //return res.redirect('submitJob.html');
    res.send('submitJob.html');
  })
  app.post('/submitJob',upload.single('UploadImage'), async (req, res) => {
      try{
        const jobsubmit = new Job({
            ownername: req.body.ownerName,
            jobOrbusiness: req.body.JobTitle,
            category: req.body.Category,
            jobDescription: req.body.JobDescription,
            images:'uploads/'+ req.file.filename,
            BNumber: req.body.BNumber,
            location: req.body.location
        })
        console.log(req.body.ownerName,
     req.body.JobTitle,
            req.body.Category,
             req.body.JobDescription,
           req.body.UploadImage,
             req.body.BNumber,
            req.body.location)


      const jobSubmitted=await jobsubmit.save();
      console.log(jobSubmitted);
      res.redirect('index.html')
      const duplicateDocuments = await Job.find({ name: null }).exec();
      
      }
      catch (error) {
        console.log({ error });
      }
  });
 /* app.get('/trial.html',async function(req, res, next)
    {
      const jobs= await Job.find().exec();
      console.log(jobs);
      let cardHtml = '';
    jobs.forEach((job) => {
      cardHtml += `
        <div class="card">
          <h2>${job.jobOrbusiness}</h2>
          <p>Category: ${job.category}</p>
          <p>Description: ${job.jobDescription}</p>
          <img src="${job.images}" alt="${job.jobOrbusiness}">
          <p>BNumber: ${job.BNumber}</p>
          <p>Location: ${job.location}</p>
        </div>
      `;
    });
    res.type('application/javascript');

    // Send the HTML with the cards to the client
    res.render(`
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
        margin: 0;
        padding: 0;
    }
    body{
        background:rgba(0,0,0,0.7) url('../bg.jpg');
        background-size: cover;
        background-blend-mode: darken; 
    }
    .card:hover {
    box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  }


  .card{

    margin: 5px;
    border-radius: 10px;
  }


  .card img{
    width: 100%;
    height: 250px;
    
  } 


  .card-title {
    margin-top:0px;
    font-weight: 700;
    font-size: 1.65em;
  }


  #card-price{

    color: #ff8300;
  }
  .product_view .modal-dialog{max-width: 800px; width: 100%;}
  </style>    
</head>
<body>
    <div class="display" id="display">

    </div>
    <script src="./../index.js"></script>
</body>
</html>`); 
      
  }
  );*/


app.listen(port, () => {
    console.log(`server running on port ${port}`);
})


