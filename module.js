var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

exports.ReadData = function(res){
    MongoClient.connect('mongodb://localhost:27017/',{ useNewUrlParser: true }, function(err, dbvar){
        if(err) throw err

        var coll= dbvar.db('CasestudyDB');
        coll.collection('product').find().toArray(function(err,data){
            if(err) throw err;

            console.log("Data from mongo to Node" + data);
            dataArr = JSON.stringify(data);
            console.log("dataArr"+ dataArr);
            res.send(dataArr);
            dbvar.close();
        })
        dbvar.close();
    })
}

exports.DelData = function(x){
    MongoClient.connect('mongodb://localhost:27017/',{ useNewUrlParser: true }, function(err,dbvar){
        if(err) throw err
       
        var coll = dbvar.db('CasestudyDB');
        coll.collection('product').deleteOne({_id: new ObjectId(x._id)}, true , function(err,data){
            if(err) throw err

            console.log("1 document deleted");

            dbvar.close();
        })
        dbvar.close();
    } )

}

exports.InsertData = function(x){
    MongoClient.connect('mongodb://localhost:27017/', function(err,dbvar){
        if(err) throw err

        var coll = dbvar.db('CasestudyDB');
        coll.collection('product').insert(x, true, function(err,data){
            if (err) throw err

            console.log('1 document inserted');
            dbvar.close();
        })
        dbvar.close();
    })
}

exports.UpdateData = function(x){
    MongoClient.connect('mongodb://localhost:27017/', function(err,dbvar){
        if(err) throw err
        console.log(x.ref)
        var coll = dbvar.db('CasestudyDB');
        coll.collection('product').updateOne({_id: new ObjectId(x.ref._id)},{$set: x.value}, true, (err,data)=>{
            if(err) throw err

            //console.log(r.modifiedCount);
            dbvar.close();
        })
        dbvar.close();
    })
}

exports.DeleteAll = function(){
     MongoClient.connect('mongodb://localhost:27017/',{ useNewUrlParser: true }, function(err,dbvar){
        if(err) throw err
       
        var coll = dbvar.db('CasestudyDB');
        coll.collection('product').deleteMany({}, true , function(err,data){
            if(err) throw err

            console.log("1 document deleted");

            dbvar.close();
        })
        dbvar.close();
    } )

}