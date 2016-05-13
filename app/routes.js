 const User=require('./models/user');
 const passport=require('passport');

module.exports=function(app){

  app.get('/', function(req, res){

    res.render('index');

  });

  app.get('/login', function(req, res){

    res.render('login', {message: req.flash('loginMessage')});

  });
  app.post('/login', passport.authenticate('local-login', {

    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true

  }));
  app.get('/signup', function(req, res){

    res.render('signup', {message: req.flash('signupMessage')});

  });
  //form submission from signup page
  app.post('/signup', passport.authenticate('local-signup', {

    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true

  }));

  app.get('/profile', isLoggedIn, function(req, res){

    res.render('profile', {user: req.user});

  });

  //get parameters from route
  app.get('/:username/:password', function(req, res){

    const newUser=new User();

    //save parameters from route into database
    newUser.local.username=req.params.username;
    newUser.local.password=req.params.password;
    console.log(newUser.local.username+" "+newUser.local.password);
    //save to database
    newUser.save(function(err){
      if(err)
        throw err;

    });

    res.send('success');

  });
};

//isLoggedIn function
function isLoggedIn(req, res, next){

  if(req.isAuthenticated()){

    return next();

  }

  res.redirect('/login');

}
