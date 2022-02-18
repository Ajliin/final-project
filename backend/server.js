import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

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

    // if (!user) {
    //   res.status(404).json({
    //     response: "Email or password doesn't match option1",
    //     success: false,
    //   })
    // }

    if (user && bcrypt.compareSync(password, user.password)) {
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

// 5. POST for creting a new myPage

app.post('/profile', async (req, res) => {
  const { description, user } = req.body

  try {
    const queriedUser = await User.findById(user)

    const newUser = await new MyPage({
      description: description,
      user: queriedUser,
    }).save()

    res.status(201).json({ response: newUser, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// 6. to GET profile for user
app.get('/profile/:userId', authenticateUser)
app.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const profile = await MyPage.find({ user: userId }, { description: 1 })

    res.status(200).json({ response: profile, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// ****************** COMPANY ***********************

//7. to create POST new company
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

  try {
    const findFilter = {}
    const findFilter2 = {}

    if (reqSkill1) {
      findFilter.skills = { $regex: new RegExp(reqSkill1, 'i') }
    }
    if (reqSkill2) {
      findFilter2.skills = { $regex: new RegExp(reqSkill2, 'i') }
    }

    const allCompanyname = Company.find(findFilter)

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

    const company = await Company.findById(companyId)
    company.rating =
      company.reviews.reduce((acc, item) => item.rating + acc, 0) /
      company.reviews.length

    await company.save()

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

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
