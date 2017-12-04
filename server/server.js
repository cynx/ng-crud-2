
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const faker = require('faker');

const app = express();
// Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var guidGenerator = function() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", " GET, PUT, POST, DELETE");
  next();
});

var doctors = [
    
    { 
      Id: guidGenerator(), 
      Name:   faker.random.words(),
      Address:   faker.random.words(),
      Available:   faker.random.boolean(),
    },

    { 
      Id: guidGenerator(), 
      Name:   faker.random.words(),
      Address:   faker.random.words(),
      Available:   faker.random.boolean(),
    },

    { 
      Id: guidGenerator(), 
      Name:   faker.random.words(),
      Address:   faker.random.words(),
      Available:   faker.random.boolean(),
    },

    { 
      Id: guidGenerator(), 
      Name:   faker.random.words(),
      Address:   faker.random.words(),
      Available:   faker.random.boolean(),
    },

    { 
      Id: guidGenerator(), 
      Name:   faker.random.words(),
      Address:   faker.random.words(),
      Available:   faker.random.boolean(),
    },

];

app.get('/api/doctors', function (req, res) {  
  res.json({data: doctors})
})

app.get('/api/doctors/:id', function (req, res) {    
  res.json({data: doctors.find((e) => e.Id === req.params.id)})
})

app.post('/api/doctors', function (req, res) {  
  var doctor = req.body;
  doctor.Id = guidGenerator();
  doctors.push(doctor);

  res.json(doctor)
})

app.put('/api/doctors/:id', function (req, res) {   
  var doctor = doctors.find((e) => e.Id === req.params.id);
  doctor.Name = req.body.Name;
  doctor.Address = req.body.Address;
  doctor.Available = req.body.Available;
  res.json(doctor);
})

app.delete('/api/doctors/:id', function (req, res) {  
  doctors = doctors.filter((e) => e.Id !== req.params.id); 

  res.json({id: req.params.id})
})
var patients = [
    
    { 
      Id: guidGenerator(), 
      Name:   faker.random.words(),
      Address:   faker.random.words(),
      Age:   faker.random.number(),
      History:   faker.random.words(),
      DoctorId: doctors[0].Id,
    },

    { 
      Id: guidGenerator(), 
      Name:   faker.random.words(),
      Address:   faker.random.words(),
      Age:   faker.random.number(),
      History:   faker.random.words(),
      DoctorId: doctors[1].Id,
    },

    { 
      Id: guidGenerator(), 
      Name:   faker.random.words(),
      Address:   faker.random.words(),
      Age:   faker.random.number(),
      History:   faker.random.words(),
      DoctorId: doctors[2].Id,
    },

    { 
      Id: guidGenerator(), 
      Name:   faker.random.words(),
      Address:   faker.random.words(),
      Age:   faker.random.number(),
      History:   faker.random.words(),
      DoctorId: doctors[3].Id,
    },

    { 
      Id: guidGenerator(), 
      Name:   faker.random.words(),
      Address:   faker.random.words(),
      Age:   faker.random.number(),
      History:   faker.random.words(),
      DoctorId: doctors[4].Id,
    },

];

app.get('/api/patients', function (req, res) {  
  res.json({data: patients})
})

app.get('/api/patients/:id', function (req, res) {    
  res.json({data: patients.find((e) => e.Id === req.params.id)})
})

app.post('/api/patients', function (req, res) {  
  var patient = req.body;
  patient.Id = guidGenerator();
  patients.push(patient);

  res.json(patient)
})

app.put('/api/patients/:id', function (req, res) {   
  var patient = patients.find((e) => e.Id === req.params.id);
  patient.Name = req.body.Name;
  patient.Address = req.body.Address;
  patient.Age = req.body.Age;
  patient.History = req.body.History;
  patient.DoctorId = req.body.DoctorId;
  res.json(patient);
})

app.delete('/api/patients/:id', function (req, res) {  
  patients = patients.filter((e) => e.Id !== req.params.id); 

  res.json({id: req.params.id})
})


app.listen(3500, function () {
  console.log('Example app listening on port 3500!')
})