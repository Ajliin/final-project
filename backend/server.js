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

// ************** Middleware ****************
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// ************** authenticate user ****************

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

// ************** END POINTS ****************

//1. Signup endpoint

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

// 2. Signin endpoint
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
// 3. Edit hasCompany
app.patch('/user-edit/:userId', async (req, res) => {
  const { userId } = req.params
  const updatedInfo = req.body

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedInfo },
      { new: true },
    )

    res.status(200).json({
      response: { hasCompany: updatedUser.hasCompany },

      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

//4. GET Edit hasCompany
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

// 5. endpoint for creting a new myPage

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

// 6. to get profile for user
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

//7. to create new company
app.post('/company', async (req, res) => {
  const {
    companyName,
    genderRatio,
    companyDescription,
    location,
    skills,
    url,
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
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// 8. to GET searched company

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
        rating: getCompany.rating,
        countRating: getCompany.countRating,
        reviews: getCompany.reviews,
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// 9. To GET your own company
app.get('/company/:userId', authenticateUser)
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
        rating: getCompany.rating,
        countRating: getCompany.countRating,
        reviews: getCompany.reviews,
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

//11 to PATCH edit company
app.patch('/company/:companyId', async (req, res) => {
  const { companyId } = req.params
  const updatedInfo = req.body

  try {
    const updateCompany = await Company.findOneAndUpdate(
      { _id: companyId },
      { $set: updatedInfo },
      {
        new: true,
      },
    )

    res.status(200).json({ response: updateCompany, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// 12 to GET all companies
app.get('/allcompanies', async (req, res) => {
  try {
    const companies = await Company.find({})
    res.status(200).json({ response: companies, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

//13 to GET searched company CATEGORIES
app.get('/category-companies', async (req, res) => {
  const reqSkill1 = req.query.skills?.toLowerCase()
  const reqSkill2 = req.query.reqskills2?.toLowerCase()

  // const category = req.body
  console.log('req.query.skills?.toLowerCase()', reqSkill1)
  console.log('req.query.skills?.toLowerCase()', reqSkill2)
  //console.log('skills inside result-get', skills)

  try {
    const findFilter = {}
    const findFilter2 = {}

    if (reqSkill1) {
      console.log('HEJ!!')
      findFilter.skills = { $regex: new RegExp(reqSkill1, 'i') }
      console.log('findFilter.reqSkill1', findFilter.skills)
    }
    if (reqSkill2) {
      findFilter2.skills = { $regex: new RegExp(reqSkill2, 'i') }
      console.log('findFilter2.reqSkill2', findFilter2.skills)
    }
    console.log('findfilter', findFilter)
    console.log('findfilter2', findFilter2)

    // console.log("Company",Company)
    //     const allCompanyname1 = await Company.find(findFilter)
    //    console.log("allCompanyname1", allCompanyname1)
    //     const allCompanyname2 = await Company.find(findFilter2)
    //     console.log("allCompanyname2", allCompanyname2)

    //     if (allCompanyname1._id === allCompanyname2._id){
    //       console.log("TRRRRRUE", allCompanyname2.companyName)
    //     }
    const allCompanyname = Company.find(findFilter)
    console.log('allCompanyname', allCompanyname)
    const resultCompany = await allCompanyname.limit(50)

    res.status(200).json({ response: resultCompany, success: true })
  } catch (error) {
    res.status(404).json({ response: error, success: false })
  }
})

//14 to GET searched company on landing page
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
    console.log('allCompanyname', allCompanyname)
    const resultCompany = await allCompanyname.limit(50)
    console.log('resultCompany', resultCompany)

    res.status(200).json({ response: resultCompany, success: true })
  } catch (error) {
    res.status(404).json({ response: error, success: false })
  }
})

// 15 To rate company
app.post('/rating/:companyId', async (req, res) => {
  const { companyId } = req.params
  const { newRating, comment, reviewerId } = req.body

  try {
    //mongo operator

    const companyUpdate = await Company.findByIdAndUpdate(companyId, {
      $push: {
        reviews: {
          companyId,
          rating: Number(newRating),
          comment,
          reviewerId,
          createdAt: Date.now(),
        },
      },

      $inc: {
        countRating: 1,
      },
    })
    //console.log('company!!!!!!!!!!!!!', companyUpdate)
    // company.countRating = company.reviews.length
    const company = await Company.findById(companyId)
    company.rating =
      company.reviews.reduce((acc, item) => item.rating + acc, 0) /
      company.reviews.length

    await company.save()

    // console.log('company.rating!!!!!!', company.rating)

    // const sortedCompany = await Company.aggregate([
    //   {
    //     $match: { _id: companyId },
    //   },
    //   {
    //     $unwind: '$reviews',
    //   },
    //   {
    //     $sort: {
    //       'reviews.createdAt': -1,
    //     },
    //   },
    // ])

    //const sortedCompany = await Company.findById(companyId)

    console.log('after sortedCompany', sortedCompany)

    res.status(200).json({
      response: {
        companyName: company.companyName,
        rating: Math.round(company.rating * 10) / 10,
        countRating: sortedCompany.countRating,
        reviews: sortedCompany.reviews.sort(
          (a, b) => b.createdAt - a.createdAt,
        ),
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, sucess: false })
  }
})

// 16 To caluculate media company
app.get('/rating/:companyId', async (req, res) => {
  const { companyId } = req.params
  //const { newRating, comment, reviewerId } = req.body

  try {
    // const company = await Company.findById(companyId)

    // company.rating =
    //   company.reviews.reduce((acc, item) => item.rating + acc, 0) /
    //   company.reviews.length

    //mongo operator
    const company = await Company.findByIdAndUpdate(companyId, {
      $push: {
        reviews: {
          companyId,
          rating: Number(newRating),
          comment,
          reviewerId,
          createdAt: Date.now(),
        },
      },

      $inc: {
        countRating: 1,
      },
    })
    console.log('company!!!!!!!!!!!!!', company)
    // company.countRating = company.reviews.length

    // company.rating =
    //   company.reviews.reduce((acc, item) => item.rating + acc, 0) /
    //   company.reviews.length

    // const sortedCompany = await Company.aggregate([
    //   {
    //     $match: { _id: companyId },
    //   },
    //   {
    //     $unwind: '$reviews',
    //   },
    //   {
    //     $sort: {
    //       'reviews.createdAt': -1,
    //     },
    //   },
    // ])

    const sortedCompany = await Company.findById(companyId)

    console.log('after sortedCompany', sortedCompany)

    res.status(200).json({
      response: {
        companyName: company.companyName,
        rating: Math.round(sortedCompany.rating * 10) / 10,
        countRating: sortedCompany.countRating,
        reviews: sortedCompany.reviews.sort(
          (a, b) => b.createdAt - a.createdAt,
        ),
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, sucess: false })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
