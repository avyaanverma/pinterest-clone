var express = require('express');
var router = express.Router();
const passport = require('passport');
const Posts = require('./posts');
const User = require('./users');
const LocalStrategy = require('passport-local');
passport.use(new LocalStrategy(User.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req,res){
  res.render('register')
})
router.get('/profile', isLoggedIn,function(req,res,next){
  res.render('profile')
})
router.post('/register', (req,res)=>{
  console.log(req.body);
  const {email, username} = req.body;
  const newUser = new User({email,username});

  User.register(newUser, req.body.password)
  .then(function(){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile')
    })
  })
})
router.post('/login',passport.authenticate('local',{
  successRedirect:"/profile",
  failureRedirect:"/"
}) )

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = router
