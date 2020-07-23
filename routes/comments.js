const express=require('express'),
	  router=express.Router(),
	  Campground=require('../models/campground'),
	  Comment=require('../models/comment'),
	  middleware=require('../middleware');




//comments

router.get('/campgrounds/:id/comments/new',middleware.isLoggedIn,(req,res)=>{
	Campground.findById(req.params.id,(err,campground)=>{
		if(err){
			console.log(err);
		}
		else{
			res.render('comments/new',{campground});
		}
	})
	
});


router.post('/campgrounds/:id/comments',middleware.isLoggedIn,(req,res)=>{
	Campground.findById(req.params.id,(err,campground)=>{
		if(err){
			console.log(err);
			res.redirect('/campgrounds');
		}
		else{
			Comment.create(req.body.comment,(err,comment)=>{
				if(err){
					console.log(err);
				}
				else{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully added comment!");
					res.redirect('/campgrounds/'+req.params.id);
				}
			})
		}
		
	})
});



//edit

router.get('/campgrounds/:id/comments/:comment_id/edit',middleware.checkCommentOwnership,(req,res)=>{
	Comment.findById(req.params.comment_id,(err,foundComment)=>{
		if(err){
			res.redirect('back');
		}
		else{
			console.log(foundComment._id);
			res.render('comments/edit',{campground_id:req.params.id,comment:foundComment});}
		});
	})


//comments update
	router.put('/campgrounds/:id/comments/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
		console.log(req.body.comment);
		
		Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComments)=>{
			if(err){
				res.redirect('back');
			}else{
				res.redirect("/campgrounds/"+req.params.id);
			}
		})
	});

//comment destroy
router.delete('/campgrounds/:id/comments/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
	Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
		if(err){
			res.redirect('back');
		}else{
			req.flash("success","Successfully deleted the comment!");
			res.redirect('/campgrounds/'+req.params.id);
		}
		
	})
})




module.exports=router;

