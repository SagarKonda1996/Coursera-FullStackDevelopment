var rect=require('./rectange')

const solveRect=(a,b)=>{
    console.log(`\n Solving for Rectangle L= ${a} & B= ${b}`)
    rect(a,b,(err,rectangle )=>{
        if(err){
            console.log("Error : "+ err.message)
        }
        else{
            console.log(`The area of rectangle of Dimensions L= ${a} and B= ${b} is ${rectangle.area()}`)
            console.log(`The Perimeter of rectangle of Dimensions L= ${a} and B= ${b} is ${rectangle.perimiter()}`)
        }
    })
    console.log("This is Executed after call to rect()")
}
solveRect(2,4)
solveRect(3,5)
solveRect(6,7)
solveRect(0,1)