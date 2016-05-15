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

    // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  app.get('/auth/facebook', passport.authenticate('facebook'));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/' }));
  app.get('/logout', function(req, res){
    //passport function logout
    req.logout();
    res.redirect('/');

  });
};

//isLoggedIn function
function isLoggedIn(req, res, next){

  if(req.isAuthenticated()){

    return next();

  }

  res.redirect('/login');

}
