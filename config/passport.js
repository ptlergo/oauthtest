const LocalStrategy=require('passport-local').Strategy;
const User=require('../app/models/user');

module.exports=function(passport){

  passport.serializeUser(function(user, done){

    done(null, user.id);

  });

  passport.deserializeUser(function(id, done){

    User.findById(id, function(err, user){

      done(err, user);

    });
  });

  passport.use('local-signup', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

  },
  function(req, email, password, done){
    //use a node function to make this asynch
    //execute this once everything else is done
    process.nextTick(function(){
      //search databse for local email and use callback function to determine
      //if user in database; done with flash
      User.findOne({'local.username': email}, function(err, user){

        if(err)
          return done(err);
        if(user){
          return done(null, false, req.flash('signupMessage', 'That email is already taken'));
        } else {
          const newUser=new User();
          //save with hash
          newUser.local.username=email;
          newUser.local.password=password;

          newUser.save(function(err){
            if(err)
              throw err;
            return done(null, newUser);
          });
        }
      });

    });
  }
));

passport.use('local-login', new LocalStrategy({

  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true

},

  function(req, email, password, done){

    process.nextTick(function(){

      User.findOne({'local.username': email}, function(err, user){

        if(err)
          return done(err);
        if(!user)
          return done (null, false, req.flash('loginMessage', 'No User Found'));
        if(user.local.password != password)
          return done(null, false, req.flash('loginMessage', 'invalid password'));
        return done(null, user);

      });
    });
  }
));

};
