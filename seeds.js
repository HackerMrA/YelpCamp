const mongoose=require('mongoose'),
	  Campground=require('./models/campground'),
	  Comment=require('./models/campground');


const data=[
	{
		name:'clouds',
		image:'https://images.unsplash.com/photo-1592204153614-b9473666fd86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description:'You may lost in there'
	},
	{
		name:'clouds',
		image:'https://images.unsplash.com/photo-1592204153614-b9473666fd86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description:'You may lost in there'
	},
	{
		name:'clouds',
		image:'https://images.unsplash.com/photo-1592204153614-b9473666fd86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description:'You may lost in there'
	},{
		name:'clouds',
		image:'https://images.unsplash.com/photo-1592204153614-b9473666fd86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description:'You may lost in there'
	}
]


const seedDB=()=>{
	Campground.deleteMany({},(err)=>{
	console.log('removed');
		data.forEach(seed=>{
		Campground.create(seed,(err,data)=>{
			if(err){
				console.log(err);
			}
			else{
				console.log('added one!');
				//create comment
				Comment.create({text:'this photo is great',author:'ani'},(err,cmnt)=>{
					data.comments.push(cmnt);
					data.save();
				})
			}
		})
	});
});
	

}


module.exports=seedDB;


