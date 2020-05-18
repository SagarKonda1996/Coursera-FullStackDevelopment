var rect=require('./rectange')

const solveRect=(a,b)=>{
    console.log(`\n Solving for Rectangle L= ${a} & B= ${b}`)
    if(a<=0 || b<=0){
        console.log("Rectangle Dimensions Should be Greater than Zero")
    }
    else {
        console.log(`Area of Rectange = ${rect.area(a,b)}`)
        console.log(`Perimeter of Rectange = ${rect.permiter(a,b)}`)
    }
}
solveRect(2,4)
solveRect(3,5)
solveRect(6,7)
solveRect(0,1)