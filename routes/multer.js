const multer = require("multer");
const {v4:uuidv4} = require("uuid");
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/data/uploads/') // destination folder
    },

    filename : function(req,file,cb){
        const uniquefileName = uuidv4();
        cb(null, uniquefileName + path.extname(file.originalname));
    }
})
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//         cb(null, true);
//     } else {
//         cb("Type file is not access", false);
//     }
// };



const upload = multer({storage:storage});

module.exports = upload;