const mongoose=require('mongoose')
const Dishes=require('./models/dishes')
const config=require('./dbconfig')

const url=config.url
const connect=mongoose.connect(url);

connect
.then((db)=>{
    console.log("Connected Correctly to Server")
    var newDish=Dishes({
        name:"Uthappizza",
        description:"test"
    })
    newDish.save()
    .then((dish)=>{
        console.log(dish)

       return Dishes.find({}).exec()
    })
    .then((dishes)=>{
        console.log(dishes);
        return Dishes.deleteMany({})
    })
    .then(()=>{
        return mongoose.connection.close()
    })
    .catch((err)=>{
        console.log(err);
    });
})
.catch(err=>console.log(err))