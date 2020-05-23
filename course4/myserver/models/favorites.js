const mongoose=require('mongoose');
const Schema=mongoose.Schema
const Dishes=require('./dishes');


const favoritesSchema=new Schema({
   user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
   },
   dishes:[{
       type:mongoose.Types.ObjectId,
       ref:'Dish'
   }]
},{
    timestamps:true
})


var favorites=mongoose.model('favorite',favoritesSchema);

module.exports=favorites;