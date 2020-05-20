const MongoClient=require('mongodb').MongoClient;
const assert=require('assert')
const config=require('./dbconfig')
const dboper=require('./operations')

const url=config.url
const dbname=config.dbname

MongoClient.connect(url)
.then((client)=>{
    console.log('Connected Correctly to Server')

    const db=client.db(dbname);
    dboper.insertDocument(db,{"name":"Vadonut","description":"Test"},'dishes')
    .then((result)=>{
        
        console.log("Inserted Document :\n",result.ops);
        
        return dboper.findDocuments(db,'dishes')
    })
    .then((docs)=>{   
        
        console.log("Found Documents :\n",docs)

        return dboper.updateDocument(db,{"name":"Vadonut"},{"description":"Updated Test"},'dishes')
    })
    .then((result)=>{            
        
        console.log("Updated Document :\n",result.result);
        
        return dboper.findDocuments(db,'dishes')
        
    })
    .then((docs)=>{            
        
        console.log("Found Documents :\n",docs)
        return db.dropCollection('dishes')
    })
    .then((result)=>{                    
        console.log("Dropped Collection : ",result);
        client.close();
    })
})
.catch((err)=>{
    console.log(err)
})
