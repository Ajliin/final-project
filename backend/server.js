import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/foaje'
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})
mongoose.Promise = Promise

// *************** Schemas **************

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
  hasCompany: {
    type: Boolean,
  },
})

// MY PAGE
const MyPageSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

// COMPANY
const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    unique: true,
  },
  companyDescription: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
    },
  ],
  url: {
    type: String,
  },
  rating: {
    type: Number,
  },
  genderRatio: {
    type: Number,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

// ************** Models ****************

const User = mongoose.model('User', UserSchema)
const MyPage = mongoose.model('myPage', MyPageSchema)
const Company = mongoose.model('Company', CompanySchema)

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:

// ************** Middleware ****************
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    console.log('auten user', user)
    if (user) {
      next()
    } else {
      res.status(401).json({
        response: {
          message: 'Please, log in',
        },
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}

// Authentication = member - 401
// Authorization = what type of member - 403

// Start defining your routes here
// app.get('/thoughts', authenticateMyPage)
//Signup endpoint

app.post('/signup', async (req, res) => {
  const { username, password, email, hasCompany } = req.body

  try {
    const salt = bcrypt.genSaltSync()

    if (password.length < 5) {
      throw 'Password must be at least 5 characters long'
    }

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
      email,
      hasCompany: false,
    }).save()

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
        accessToken: newUser.accessToken,
        hasCompany: newUser.hasCompany,
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// Signin endpoint
app.post('/signin', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (email && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          email: user.email,
          accessToken: user.accessToken,
          hasCompany: user.hasCompany,
        },
        success: true,
      })
    } else {
      res.status(404).json({
        response: "Username or password doesn't match",
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})
//Edit hasCompany
app.patch('/user-edit/:userId', async (req, res) => {
  const { userId } = req.params
  console.log('userId in patch', userId)
  const updatedInfo = req.body
  console.log('updatedInfo', updatedInfo)

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedInfo },
      { new: true },
    )
    console.log('updatedUser!!!!!!!!!!!', updatedUser)

    res.status(200).json({
      response: { hasCompany: updatedUser },

      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

//GET Edit hasCompany
app.get('/user-edit/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const companyExist = await Company.find({ user: userId })
    //console.log('companyExist', companyExist)
    if (companyExist.length !== 0) {
      res.status(200).json({
        response: { hasCompany: true, companyExist },
        success: true,
      })
    } else {
      res.status(200).json({ response: { hasCompany: false }, success: true })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

//endpoint for creting a new myPage
//app.post('/profile', authenticateMyPage)
app.post('/profile', async (req, res) => {
  const { description, user } = req.body

  try {
    const queriedUser = await User.findById(user)
    //console.log(queriedUser)
    const newUser = await new MyPage({
      description: description,
      user: queriedUser,
    }).save()
    //console.log('newUser', newUser)

    res.status(201).json({ response: newUser, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

//to get "all" profile- maybe not needed later, will just be one and prob. patch?
app.get('/profile/:userId', authenticateUser)
app.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const profile = await MyPage.find({ user: userId }, { description: 1 })
    // console.log('inside ge - profile', profile)
    res.status(200).json({ response: profile, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// ****************** COMPANY ***********************

//to create new company
app.post('/company', async (req, res) => {
  const {
    companyName,
    genderRatio,
    companyDescription,
    location,
    skills,
    url,
    rating,
    user,
  } = req.body

  //console.log('user inside app.post', user)

  try {
    const queriedUser = await User.findById(user)
    const newCompany = await new Company({
      companyName,
      genderRatio,
      user: queriedUser,
      companyDescription,
      location,
      skills,
      url,
      rating,
    }).save()

    res.status(201).json({
      response: {
        companyId: newCompany._id,
        companyName: newCompany.companyName,
        user: newCompany.user,
        companyDescription: newCompany.companyDescription,
        location: newCompany.location,
        skills: newCompany.skills,
        url: newCompany.url,
        rating: newCompany.rating,
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// to get all companies from one unser

//app.get('/company/:userId', authenticateUser)
app.get('/company/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const getCompany = await Company.find({ user: userId })
    // console.log('userID get companypage', userId)
    //console.log('company get companypage', getCompany)
    res.status(200).json({ response: { getCompany }, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})
// app.get('/company-edit/:userId', async (req, res) => {
//   //req.query ==> ?company="id"

//   const { userId } = req.params
//   //const companyInfo = req.body
//   console.log('inside get edit', userId)

//   try {
//     console.log('inside TRY edit')
//     const showCompany = await Company.find({ user: userId })
//     console.log('updatecompany', showCompany)

//     res.status(201).json({ response: showCompany, success: true })
//   } catch (error) {
//     res.status(400).json({ response: error, success: false })
//   }
// })

//to edit company
app.patch('/company/:companyId', async (req, res) => {
  //req.query ==> ?company="id"

  const { companyId } = req.params
  const updatedInfo = req.body

  //console.log('userId INSIDE PATCH!!!!', companyId)
  try {
    // console.log('inside try in patch')
    // const queriedCompany = await Company.find({ user: userId })
    // console.log('queriedCompany', queriedCompany)
    const updateCompany = await Company.findOneAndUpdate(
      { _id: companyId },
      { $set: updatedInfo },
      {
        new: true,
      },
    )
    // console.log(
    //   'updatecompany (what will be send back) in PATCH',
    //   updateCompany,
    // )

    res.status(200).json({ response: updateCompany, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// to get all companies
app.get('/allcompanies', async (req, res) => {
  try {
    const companies = await Company.find({})
    res.status(200).json({ response: companies, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
