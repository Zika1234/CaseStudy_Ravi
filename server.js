var exp = require('express');
var app = exp();
var bodyParser = require('body-parser')
var cors = require('cors');
var mod= require('./module.js');

var MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({encoded: true}))

app.get('/rest/api/read', (req,res)=>{
res.header("Access-Control-Allow-Origin", "*"),
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
    console.log("THIS IS SERVER")    
   // console.log(mod.ReadData());
    mod.ReadData(res);
})

app.post('/rest/api/delete', (req,res)=>{
res.header("Access-Control-Allow-Origin", "*"),
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
console.log("THIS is Delete")
console.log(req.body);
// res.send(req.body);
mod.DelData(req.body);
})


app.post('/rest/api/insert',(req,res)=>{
res.header("Access-Control-Allow-Origin", "*"),
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")

console.log(req.body);
mod.InsertData(req.body); 
})

app.post('/rest/api/update', (req,res)=>{
res.header("Access-Control-Allow-Origin", "*"),
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")

console.log(req.body);
mod.UpdateData(req.body)
})

app.get('/rest/api/deleteAll',(req,res)=>{
res.header("Access-Control-Allow-Origin", "*"),
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
res.send();
mod.DeleteAll();  
})
app.use(cors()).listen(1221,()=>{
    console.log('Express Started')
})
