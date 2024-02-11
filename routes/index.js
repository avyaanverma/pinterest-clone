var express = require('express');
var router = express.Router();
const postsModel = require('./posts');
const userModel = require('./users');
const upload = require('./multer')
const passport = require('passport');
const LocalStrategy = require('passport-local');
passport.use(new LocalStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res, next) {
  const error = req.flash('error');
  res.render('login', {error: error});
});

router.get('/register', function(req,res){
  res.render('register')
})

router.get('/profile', isLoggedIn,async function(req,res,next){
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  .populate("posts");
  res.render('profile', {user:user})

})

// file uploading and storing in the database 
router.post('/upload', isLoggedIn,upload.single('file'),async (req, res) => {
  if(!req.file) {
   return res.status(400).send('No files were uploaded');
   }

   const user = await userModel.findOne({username : req.session.passport.user})
   const post = await postsModel.create({
      image: req.file.filename,
      postText: req.body.filecaptions,
      user: user._id
   })

   await user.posts.push(post._id);
   await user.save();
   res.redirect('/profile');
});

router.post('/register', (req,res)=>{
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
    failureRedirect:"/login",
    failureFlash:true
  }), function(req,res){} )

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = router
