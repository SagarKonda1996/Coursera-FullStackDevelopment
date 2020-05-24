var express = require('express');
const bodyParser=require('body-parser');
var User=require('../models/users');
var passport=require('passport');
var authenticate=require('../authenticate');
var cors=require('./cors');

var router = express.Router();
router.use(bodyParser.urlencoded({extended:true}));
/* GET users listing. */
router.options('*',cors.corsWithOptions,(req,res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json')
})
router.get('/', cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,function(req, res, next) {
 User.find({})
 .then((users)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json')
  res.json(users)
},
  (err) => next(err))
.catch((err) => next(err))
});

router.post('/signup',cors.corsWithOptions,(req,res,next)=>{
  
  User.register(new User({username:req.body.username}),
                req.body.password,(err,user)=>{
                  if(err)
                  {
                    res.statusCode=500;
                    res.setHeader('Content-Type','application/json');
                    res.json({err:err});
                  }
                  else 
                  {
                    if(req.body.firstname)
                    {
                      user.firstname=req.body.firstname
                    }
                    if(req.body.lastname)
                    {
                      user.lastname=req.body.lastname
                    }
                    user.save((err,user)=>{
                      if(err)
                      {
                        res.statusCode=500;
                        res.setHeader('Content-Type','application/json');
                        res.json({err:err});
                        return;
                      }
                      passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ status: 'Registration Successful', user: user, success: true });
                      })
                      
                    })
                    
                  }
                })
})

router.post('/login',cors.cors,(req,res,next)=>{
       passport.authenticate('local',(err,user,info)=>{
         if(err)
         {
           return next(err);
         }
         if(!user)
         {
          res.statusCode=401;
          res.setHeader('Content-Type','application/json');
          res.json({status:'Login Unsuccessfull',success:false,err:info});
         }
         else
         {
           req.logIn(user,(err)=>{
             if(err)
             {
              res.statusCode=401;
              res.setHeader('Content-Type','application/json');
              res.json({status:'Login Unsuccessfull',success:false,err:'Could not Login User'});
             }
           })
         }
         var token=authenticate.getToken({_id:req.user._id});
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json({status:'Login successfull',success:true,token:token});
         
       })(req,res,next); 

})

router.get('/logout',cors.corsWithOptions,(req,res,next)=>{
  if(req.session)
  {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else
  {
    var err=new Error('You are not Logged in !');
    err.status=403;
    next(err);
  }
})
router.get('/facebook/token',passport.authenticate('facebook-token'),(req,res,next)=>{
if(req.user)
{
  var token=authenticate.getToken({_id:req.user._id});
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({status:'User Authenticated',success:true,token:token});
}
})

router.get('/checkJWTToken',cors.corsWithOptions,(req,res)=>{
  passport.authenticate('jwt',{session:false},(err,user,info)=>{
    if(err)
    {
      return next(err);
    }
    if(!user)
    {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ status: 'JWT invalid', success: false, err: info });
    }
    else
    {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ status: 'JWT Valid', success: true, user: user });
    }
  })(req,res);
})

module.exports = router;
