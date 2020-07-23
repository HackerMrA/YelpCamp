const express=require('express'),
	  router=express.Router(),
	  Campground=require('../models/campground'),
	  middleware=require('../middleware');




//show all campgrounds
router.get('/campgrounds',(req,res)=>{
	console.log(req.user);
	Campground.find({},(err,campgrounds)=>{
		if(err){
			console.log(err);
		}
		else{
	res.render('campgrounds/index',{campgrounds,currentUser:req.user});
			
		}
	})
	
});


//add new campground
router.post('/campgrounds',middleware.isLoggedIn,(req,res)=>{
	const name=req.body.name;
	const image=req.body.image;
	const description=req.body.description;
	const author={
		id:req.user._id,
		username:req.user.username
	}
	const price=req.body.price;
	const newCampground={name:name,image:image,description:description,author,price};
	Campground.create(newCampground,(err,newAdded)=>{
		if(err){
			console.log(err);
		}
		else{
			res.redirect('/campgrounds');
		}
	});
	
});


//show form page for adding new campground
router.get('/campgrounds/new',middleware.isLoggedIn,(req,res)=>{
	res.render('campgrounds/new');
});



//show individual campground
router.get('/campgrounds/:id',(req,res)=>{
	Campground.findById(req.params.id).populate('comments').exec((err,foundCampground)=>{
		if(err)
			console.log(err);
		else{
			res.render('campgrounds/show',{campground:foundCampground});
}
			
	});
});


//edit
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,(req,res)=>{
		Campground.findById(req.params.id,(err,foundCampground)=>{
		if(err){
			req.flash("error","Not Found!");
			res.redirect('/campgrounds');
		}
		else{
			res.render('campgrounds/edit',{campground:foundCampground});
		
		}
	
	})
	
	
	
});


//Update
router.put('/campgrounds/:id',middleware.checkCampgroundOwnership,(req,res)=>{
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedCampground)=>{
		if(err){
			res.redirect('/campgrounds');
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})


//destroy
router.delete('/campgrounds/:id',middleware.checkCampgroundOwnership,(req,res)=>{
	Campground.findByIdAndDelete(req.params.id,(err)=>{
		
			res.redirect('/campgrounds');
	})
})



module.exports=router;

