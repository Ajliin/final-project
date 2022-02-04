import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { count } from 'console'

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
  firstname: {
    type: String,
  },
  lastname: {
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
    default: 0,
  },
  countRating: {
    type: Number,
    default: 0,
  },
  genderRatio: {
    type: Number,
    required: true,
  },

  reviews: [{}],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  memberSince: {
    type: Number,
    default: () => Date.now(),
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
    // console.log('auten user', user)
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
  const { firstname, lastname, password, email, hasCompany } = req.body

  try {
    const salt = bcrypt.genSaltSync()

    if (password.length < 5) {
      throw 'Password must be at least 5 characters long'
    }

    const newUser = await new User({
      firstname,
      lastname,
      password: bcrypt.hashSync(password, salt),
      email,
      hasCompany: false,
    }).save()

    res.status(201).json({
      response: {
        userId: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
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
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          accessToken: user.accessToken,
          hasCompany: user.hasCompany,
        },
        success: true,
      })
    } else {
      res.status(404).json({
        response: "Email or password doesn't match",
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
  //console.log('userId in patch', userId)
  const updatedInfo = req.body
  //console.log('updatedInfo', updatedInfo)

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedInfo },
      { new: true },
    )
    //console.log('updatedUser!!!!!!!!!!!', updatedUser)

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
    user,
    rating,
    countRating,
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
      countRating,
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
        countRating: newCompany.countRating,
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// to get all companies from one unser

app.get('/company-result/:companyId', async (req, res) => {
  const { companyId } = req.params

  try {
    const getCompany = await Company.findById(companyId)
    // console.log('userID get companypage', userId)
    //console.log('company get companypage', getCompany)
    res.status(200).json({
      response: {
        companyId: getCompany._id,
        companyName: getCompany.companyName,
        companyDescription: getCompany.companyDescription,
        genderRatio: getCompany.genderRatio,
        location: getCompany.location,
        memberSince: getCompany.membersince,
        rating: getCompany.rating,
        countRating: getCompany.countRating,
        skills: getCompany.skills,
        url: getCompany.url,
        user: getCompany.user,
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

//app.get('/company/:userId', authenticateUser)
app.get('/company/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const getCompany = await Company.findOne({ user: userId })
    // console.log('userID get companypage', userId)
    console.log('company get companypage', getCompany)
    res.status(200).json({
      response: {
        companyId: getCompany._id,
        companyName: getCompany.companyName,
        companyDescription: getCompany.companyDescription,
        genderRatio: getCompany.genderRatio,
        location: getCompany.location,
        memberSince: getCompany.membersince,
        rating: getCompany.rating,
        countRating: getCompany.countRating,
        skills: getCompany.skills,
        url: getCompany.url,
        user: getCompany.user,
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

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

//all netflix titles here, be able to searc for a title and type
app.get('/result-companies', async (req, res) => {
  const companyName = req.query.companyName?.toLowerCase()
  const location = req.query.location?.toLowerCase()
  const skills = req.query.skills?.toLowerCase()
  // console.log('companyName inside result-get', companyName)
  //console.log('skills inside result-get', skills)

  try {
    const findFilter = {}

    if (companyName) {
      findFilter.companyName = { $regex: new RegExp(companyName, 'i') }
    }

    if (location) {
      findFilter.location = { $regex: new RegExp(location, 'i') }
    }

    if (skills) {
      findFilter.skills = { $regex: new RegExp(skills, 'i') }
    }

    const allCompanyname = Company.find(findFilter)
    const resultCompany = await allCompanyname.limit(50)

    res.status(200).json({ response: resultCompany, success: true })
  } catch (error) {
    res.status(404).json({ response: error, success: false })
  }
})

app.post('/rating/:companyId', async (req, res) => {
  const { companyId } = req.params
  const { newRating, comment, reviewerId } = req.body

  try {
    //mongo operator
    const { rating, countRating } = await Company.findById(companyId)
    const company = await Company.findById(companyId)

    console.log('rating from Tobias company', rating)
    console.log('Countrating from Tobias company', countRating)
    console.log('reviewerId from Tobias company', reviewerId)
    console.log('company from Tobias company', company)

    const review = {
      companyId,
      rating: Number(newRating),
      comment,
      reviewerId,
    }

    console.log(review)

    //const reviews = []

    company.reviews.push(review)

    console.log('company.reviews', company.reviews)

    company.countRating = company.reviews.length

    console.log('company.countRating', company.countRating)

    company.rating =
      company.reviews.reduce((acc, item) => item.rating + acc, 0) /
      company.reviews.length

    console.log('company.rating', company.rating)

    await company.save()

    res.status(200).json({ response: company, success: true })
  } catch (error) {
    res.status(400).json({ response: 'No company with that ID', sucess: false })
  }
})

// app.post('/rating/:companyId', async (req, res) => {
//   const { companyId } = req.params
//   const { newRatingUser, prevRating, NewCountRating } = req.body

//   const valueAll = prevRating * NewCountRating
//   console.log('valueAll', valueAll)
//   const x = +newRatingUser + +valueAll
//   console.log('x', x)

//   const newRating1 = x / (+NewCountRating + 1)
//   console.log('newRating1', newRating1)

//   try {
//     //mongo operator
//     const { rating, countRating } = await Company.findById(companyId)
//     console.log('rating from Tobias company', rating)
//     console.log('Countrating from Tobias company', countRating)
//     const newRating =
//       +newRatingUser + (+rating * +countRating) / (+countRating + 1)
//     console.log('newRating', newRating)

//     const updatedRating = await Company.findByIdAndUpdate(
//       { _id: companyId },
//       {
//         $inc: {
//           countRating: 1,
//         },
//         rating: newRating,
//       },
//       {
//         new: true, //updated document directly- find in documentary
//       },
//     )
//     console.log('req body', req.body)
//     console.log(updatedRating)
//     res.status(200).json({ response: updatedRating, success: true })
//   } catch (error) {
//     res.status(400).json({ response: 'No company with that ID', sucess: false })
//   }
// })

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
