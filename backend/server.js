import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { url } from 'inspector'
import { notEqual } from 'assert'
import { Resolver } from 'dns'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/foaje'
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})
mongoose.Promise = Promise

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    // unique: true,
  },
  email: {
    type: String,
    unique: true,
    // required: true,
  },
  password: {
    type: String,
    //required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'myPage',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
})

const User = mongoose.model('User', UserSchema)

const MyPageSchema = new mongoose.Schema({
  description: {
    type: String,
  },
})

const MyPage = mongoose.model('myPage', MyPageSchema)

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  genderQuote: {
    type: Number,
  },
})

const Company = mongoose.model('Company', CompanySchema)

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// const authenticateMyPage = async (req, res, next) => {
//   const accessToken = req.header('Authorization')

//   try {
//     const company = await MyPage.findOne({ accessToken })
//     if (company) {
//       next()
//     } else {
//       res.status(401).json({
//         response: {
//           message: 'Please, log in',
//         },
//         success: false,
//       })
//     }
//   } catch (error) {
//     res.status(400).json({ response: error, success: false })
//   }
// }

// Authentication = member - 401
// Authorization = what type of member - 403

// Start defining your routes here
// app.get('/thoughts', authenticateMyPage)

app.post('/profile', async (req, res) => {
  const { description } = req.body

  try {
    const newMyPage = await new MyPage({ description }).save()
    res.status(201).json({ response: newMyPage, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

app.post('/user', async (req, res) => {
  const { username, user } = req.body

  try {
    const queriedUser = await MyPage.findById(user)
    const newUser = await new User({ username, user: queriedUser }).save()

    res.status(201).json({ response: newUser, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

app.get('/user/:userId', async (req, res) => {
  const { userId } = req.params

  const user = await User.findById(userId).populate('user')
  res.status(200).json({ response: user, success: true })
})

// ****************** COMPANY ***********************
app.post('/companyprofile', async (req, res) => {
  const { companyName, genderQuote } = req.body

  try {
    const newCompany = await new Company({ companyName, genderQuote }).save()

    res.status(201).json({ response: newCompany, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

app.patch('/company', async (req, res) => {
  const { username, company } = req.body

  try {
    const queriedCompany = await Company.findById(company)
    console.log('queierd', queriedCompany)
    const newCompany = await new User({
      username,
      company: queriedCompany,
    }).save()
    console.log('indata new compnay', newCompany)

    res.status(201).json({ response: newCompany, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

app.get('/company/:companyId', async (req, res) => {
  const { companyId } = req.params

  try {
    const company1 = await User.findById(companyId).populate('company')
    res.status(200).json({ response: company1, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// app.post('/profile', async (req, res) => {
//   const { userName, myPage } = req.body

//   try {
//     const queriedUser = await User.findById(myPage)
//     console.log(queriedUser)
//     const newUser = await new MyPage({
//       userName,
//       myPage: queriedUser,
//     }).save()
//     console.log('newUser', newUser)
//     res.status(201).json({ response: newUser, success: true })
//   } catch (error) {
//     res.status(400).json({ response: error, success: false })
//   }
// })

// app.get('/profile/:userID', async (req, res) => {
//   const { userId } = req.params

//   const user = await User.findById(userId).populate('company')
//   //company = the proporty in row 66
//   res.status(201).json({ response: user, success: true })
// })

//Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body

  try {
    const salt = bcrypt.genSaltSync()

    if (password.length < 5) {
      throw 'Password must be at least 5 characters long'
    }

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
      email,
    }).save()

    res.status(201).json({
      response: {
        userId: newUser._id,
        username,
        email,
        accessToken: newUser.accessToken,
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// Signin endpoint
// app.post('/signin', async (req, res) => {
//   const { username, password } = req.body

//   try {
//     const user = await User.findOne({ username })

//     if (user && bcrypt.compareSync(password, user.password)) {
//       res.status(200).json({
//         response: {
//           userId: user._id,
//           username: user.username,
//           email: user.email,
//           accessToken: user.accessToken,
//         },
//         success: true,
//       })
//     } else {
//       res.status(404).json({
//         response: "Username or password doesn't match",
//         success: false,
//       })
//     }
//   } catch (error) {
//     res.status(400).json({ response: error, success: false })
//   }
// })

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
