const express=require('express'),
	  router=express.Router(),
	  passport=require('passport'),
	  User=require('../models/user');


//root route
router.get('/',(req,res)=>{
	res.render('landing');
});





//auth

router.get('/register',(req,res)=>{
	res.render('register');
})

router.post('/register',(req,res)=>{
	const newUser=new User({username:req.body.username});
	User.register(newUser,req.body.password,(err,user)=>{
		if(err){
			req.flash("error",err.message);
			res.redirect('back');
		}
		else{
		passport.authenticate('local')(req,res,()=>{
			req.flash("success","Welcome to YelpCamp"+user.username);
			res.redirect('/campgrounds');
		})
		}
	})
})


//login
router.get('/login',(req,res)=>{
	res.render('login');
})

router.post('/login',passport.authenticate('local',{successRedirect:"/campgrounds",failureRedirect:"/login"}),(req,res)=>{
	
});

router.get('/logout',(req,res)=>{
	req.logout();
	req.flash("success","Logged you out");
	res.redirect('/login');
});

module.exports=router;
