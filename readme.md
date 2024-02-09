# Pinterest Clone
## Using EJS, Express and Node
This is a simple Pinterest clone built using EJS, Express, and Node.js. It includes functionalities like connecting to the database, authentication using Passport.js, password hashing and salting, sessions and cookies, user profile creation, and image uploading using Multer.
## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Database Configuration](#database-configuration)
- [Authentication Setup](#authentication-setup)
- [Password Hashing and Salting](#password-hashing-and-salting)
- [Session and Cookies](#session-and-cookies)
- [User Profile](#user-profile)
- [Image Upload](#image-upload)


## Requirements

- Node.js
- npm
- MongoDB
- passport.js
- multer.js
- uuid
- passport-local-mongoose 
- mongoose 
- express-session

## Installation

Clone the repository:

```bash
git clone https://github.com/avyaanverma/pinterest-clone
```

Navigate to the project directory:
```bash
cd pinterest-clone
```

Install dependencies:

```bash
npm install 
```

# Usage
Start the application:

```bash
npm start
```
Visit http://localhost:3000 in your browser.

# Database Configuration
Ensure you have MongoDB installed and running. Update the config/database.js file with your MongoDB connection details.
```bash
// config/database.js
module.exports = {
  url: 'mongodb://localhost:27017/pinterest-clone'
};
```

# Authentication Setup
```bash
// config/passport.js
const passport = require('passport');
// ... (passport strategies and serialization)

};
```
### Include Passport middleware in your routes:
```bash
// routes/auth.js
const passport = require('passport');
const LocalStrategy = require('passport-local');
passport.use(new LocalStrategy(User.authenticate()));

router.get('/profile', isLoggedIn,async function(req,res,next){
  const user = await userModel.findOne({
    username: req.session.passport.user
  });
  res.render('profile', {user:user})

})
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

// IsLoggedIn Function 
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect('/');
}

```

# Password Hashing and Salting
Use bcrypt for password hashing and salting in the user model:

```javascript
// models/user.js
const bcrypt = require('bcrypt');

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

```

# Session and Cookies
``` javascript 
// config/session.js
const session = require('express-session');

module.exports = session({
  // session configuration options
});

```
Include session middleware in your app:
``` javascript 
// app.js
const session = require('./config/session');

app.use(session);


```

# Image Upload

## Installation 
```bash
npm i uuid multer
```
## Any ejs file
```bash
 <form action="/upload" method="POST" enctype="multipart/form-data">
          <input type="file" name="file">

          <button type="submit">Upload</button>
          </form>
```
## Multer.js

```javascript 
const multer = require('multer');
          const { v4: uuidv4} = require('uuid');

          const storage multer.diskStorage({
          destination: function (req, file, cb) (

                                   cb(null, 'uploads/') // Destination folder for uploads

          filename: function (req, file, cb) {
                                   const uniqueFilename = uuidv4(); // Generating a unique filename using UUID

          }                        cb(null, uniqueFilename); // Use the unique filename for the uploaded file

          });

          const upload multer({ storage: storage });
```

## INDEX.JS

   const upload = require('./multerSetup'); // Import the Multer middleware setup
```
          // Handle File upload
          router.post('/upload', upload.single('file'), (req, res) {

          // Access the uploaded file details via reg.file
          if (!req.file) {

          }                        return res.status(400).send('No files were uploaded.');

          res.send('File uploaded successfully!');
          });
```
# Conclusion
##### Adjust the routes and functionalities according to your specific requirements. Happy coding!

