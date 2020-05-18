module.exports=(x,y,callback)=>{
    if(x<=0 || y<=0){
        setTimeout(() => {
           return callback(
                new Error(`Rectangle Dimensions Should be Greater than Zero : L=> ${x} B=>${y}`),
                null
            )
        }, 2000);
    }
    else{
        setTimeout(() => {
            return callback(null,
                {
                    perimiter:()=>(2*(x+y)),
                    area:()=>x*y
                }
                ) 
        }, 2000);
    }   
}



