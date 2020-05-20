const MongoClient=require('mongodb').MongoClient;
const assert=require('assert')
const config=require('./dbconfig')
const dboper=require('./operations')

const url=config.url
const dbname=config.dbname

MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null)
    console.log('Connected Correctly to Server')

    const db=client.db(dbname);
    dboper.insertDocument(db,{"name":"Vadonut","description":"Test"},'dishes',(result)=>{
        
        console.log("Inserted Document :\n",result.ops);
        
        dboper.findDocuments(db,'dishes',(docs)=>{
            
            console.log("Found Documents :\n",docs)

            dboper.updateDocument(db,{"name":"Vadonut"},{"description":"Updated Test"},'dishes',(result)=>{
                
                console.log("Updated Document :\n",result.result);

                dboper.findDocuments(db,'dishes',(docs)=>{
                    
                    console.log("Found Documents :\n",docs)

                    db.dropCollection('dishes',(result)=>{
                        
                        console.log("Dropped Collection : ",result);

                        client.close();

                    });
                });
            });
        });
    });
});