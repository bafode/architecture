const jwt =require('jsonwebtoken')
const asyncHandler =require('express-async-handler')
const axios =require("axios")

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const url=`http://localhost:5000/user/${decoded.id}`
      console.log(url)
      const { data } = await axios.get(url)

     req.user = data

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})




module.exports=protect