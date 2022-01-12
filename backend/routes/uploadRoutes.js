// import path from 'path'
// import express from 'express'
// import multer from 'multer'

// const router = express.Router()

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename(req, file, cb) {
//         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//         //`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//         //`${file.fieldname} - ${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// // function checkFileType(file, cb) {
// //     const fileTypes = /jpg|jpeg|png/
// //     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase)
// //     const mimetype = fileTypes.test(file.mimetype)

// //     if(extname && mimetype) {
// //         return cb(null, true)
// //     }
// //     else{
// //         return cb('Images Only')
// //     }
// // }

// const upload = multer({
//     storage:storage
//     // fileFilter: function (req, file, cb) {
//     //     checkFileType(file, cb)
//     // }
// })

// // router.post('/', upload.single('image'), (req, res) => {
// //     //console.log("Backend:",req.file.path)
// //     res.send(`/${req.file.path}`)
// // })

// router.post('/', upload.single('image'), (req, res) => {
//     res.send(`/${req.file.path}`)
//   })


// export default router



// import path from 'path'
// import express from 'express'
// import multer from 'multer'
// const router = express.Router()

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `/${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = filetypes.test(file.mimetype)

//   if (extname && mimetype) {
//     return cb(null, true)
//   } else {
//     cb('Images only!')
//   }
// }

// const upload = multer({
//   storage:storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb)
//   },
// })

// //const upload = multer({storage:storage})

// router.post('/', upload.single('image'), function (req, res, next) {
//   res.send(`/${req.file.path}`)
// })

// // app.post('/profile', upload.single('avatar'), function (req, res, next) {
// //     // req.file is the `avatar` file
// //     // req.body will hold the text fields, if there were any
// //   })

// export default router



import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router

