const MongoClient=require('mongodb').MongoClient;
const assert=require('assert')
const config=require('./dbconfig')

const url=config.url
const dbname=config.dbname

MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null)
    console.log('Connected Correctly to Server')

    const db=client.db(dbname);
    const collection=db.collection('dishes')
    
    collection.insertOne(
        {"name":"Uthappizza","description":"text"},(err,result)=>{
            assert.equal(err,null)
            console.log("After Insert :\n")
            console.log(result.ops)
            collection.find({}).toArray((err,docs)=>{
                assert.equal(err,null)
                
                console.log("Found \n");
                console.log(docs)

                db.dropCollection('dishes',(err,result)=>{
                    assert.equal(err,null)
                    client.close()
                })

            })
        }
        
        )
})