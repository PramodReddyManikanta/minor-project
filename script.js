
const mongoose  = require('mongoose');
mongoose.connect("mongodb+srv://sayali21joshi:BSOInyNN6usdpMQB@cluster0.voozemb.mongodb.net/miniProject");

const Job=require('./submitJob.js');

async function searchAll(){
    // Find all documents in the collection
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
      
  document.getElementById("display").innerHTML = cardHtml;
  }