const express=require('express'),
	  app=express(),
	  bodyParser=require('body-parser'),
	  mongoose=require('mongoose'),
	  Campground=require('./models/campground'),
	  seedDB=require('./seeds'),
	  Comment=require('./models/comment'),
	  LocalStrategy=require('passport-local'),
	  User=require('./models/user'),
	  methodOverride=require('method-override'),
	  passport=require('passport'),
	  flash=require('connect-flash');

const commentRoutes=require('./routes/comments'),
	  campgroundRoutes=require('./routes/campgrounds'),
	  authRoutes=require('./routes/index');




mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb+srv://wt3rLviRvK4TKAtl:wt3rLviRvK4TKAtl@cluster0.nfcjq.mongodb.net/yelpcamp?retryWrites=true&w=majority");



app.use(flash());
//passport config
app.use(require('express-session')({
	secret:"Ani",
	resave:false,
	saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(methodOverride("_method"));


app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});


app.use(authRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);



app.listen(process.env.PORT,process.env.IP,()=>{
	console.log('Server is running');
})