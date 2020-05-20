const mongoose=require('mongoose')
const Dishes=require('./models/dishes')
const config=require('./dbconfig')

const url=config.url
const connect=mongoose.connect(url);

connect
.then((db)=>{
    console.log("Connected Correctly to Server")
    Dishes.create({
        name:"Uthappizza",
        description:"test"
    })

    .then((dish)=>{
        console.log(dish)

       return Dishes.findByIdAndUpdate(dish._id,
        {
          $set:{
            description:"Updated Test"}
        },
          {
              new:true
        }).exec()
    })
    .then((dish)=>{
        dish.comments.push({
            rating:5,
            comment:`I'm getting a Sinking Feeling !`,
            author:"Leornado di Carpaccio"
        })
        return dish.save()
    })
    .then((dish)=>{
        console.log(dish)
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