 const User=require('./models/user');

module.exports=function(app){

  app.get('/', function(req, res){

    res.render('index');

  });

  app.get('/signup', function(req, res){

    res.render('signup', {message: 'victory'});

  });

  //form submission from signup page
  app.post('/signup', function(req, res){

    const newUser=new User();
    //save parameters from route into database
    newUser.local.username=req.body.email;
    newUser.local.password=req.body.password;
    console.log(newUser.local.username+" "+newUser.local.password);
    //save to database
    newUser.save(function(err){
      if(err)
        throw err;

    });

    res.redirect('/');
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
