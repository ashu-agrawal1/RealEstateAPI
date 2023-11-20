const path = require("path")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, clb) {
        clb(null, "propertyImages/");
    },
    filename: function (req, file, clb) {
        const uniquePrefix =
            Date.now() + '_' + Math.round(Math.random() * 1e9);
        clb(
            null,
            file.fieldname +
            '_' +
            uniquePrefix +
            path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });
module.exports = { upload }