const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = './multer/tmp'
    cb(null, path)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ".png")
  }
})

const upload = multer({ storage: storage })

module.exports = upload