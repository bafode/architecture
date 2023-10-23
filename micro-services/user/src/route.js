const ModelUser = require("./model")
const generateToken=require("./utils/generateToken")

class User {
    /** 
     *  @url=/user
     *  @method=GET
     */
    static async allUsers(req, res) {
        const users = await ModelUser.find({})
        res.json(users)
    }

    /** 
     *  @url=/user/:id
     *  @method=GET
     */
    static async oneUser(req, res) {
        const user = await ModelUser.findById(req.params.id).select('-password')

        if (user) {
          res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            login: user.login,
          })
        } else {
          res.status(404)
          throw new Error('User not found')
        }
    }

    /** 
     *  @url=/user/auth
     *  @method=POST
     */
    static async authUser(req, res) {
        const { login, password } = req.body

        const user = await ModelUser.findOne({ login })
      
        if (user && (await user.matchPassword(password))) {
          res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            login: user.login,
            token: generateToken(user._id),
          })
        } else {
          res.status(401)
          throw new Error('Invalid login or password')
        }
    }

    /** 
     *  @url=/user/register
     *  @method=POST
     */
       static async register(req, res) {
       
        const { firstName,lastName, login, password } = req.body
        const userExists = await ModelUser.findOne({ login })
      
        if (userExists) {
          res.status(400)
          throw new Error('User already exists')
        }
      
        const user = await ModelUser.create({
          firstName,
          lastName,
          login,
          password,
        })
      
        if (user) {
          res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            login: user.login,
            token: generateToken(user._id),
          })
        } else {
          res.status(400)
          throw new Error('Invalid user data')
        }
    }

    /** 
     *  @url=/user
     *  @method=PUT
     */
    static async updateUser(req, res) {

    }

    /** 
     *  @url=/user
     *  @method=PATCH
     */
    static async partialUpdateUser(req, res) {

    }


    /** 
     *  @url=/user/:id
     *  @method=DELETE
     */
    static async deleteUser(req, res) {
        const user = await ModelUser.findById(req.params.id)

        if (user) {
          await user.deleteOne() 
          res.json({ message: 'User removed' })
        } else {
          res.status(404)
          throw new Error('User not found')
        }
    }
}

module.exports = User