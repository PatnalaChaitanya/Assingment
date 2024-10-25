const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const path = require('path')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
const dbPath = path.join(__dirname, 'users.db')

let db = null

const startServer = async () => {
  try {
    db = await open({filename: dbPath, driver: sqlite3.Database})
    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`Database Error '${e.message}'`)
    process.exit(-1)
  }
}

startServer()

// register API

app.post('/users/', async (request, response) => {
  const {name, email, password, address, phone} = request.body
  const hashedPassword = await bcrypt.hash(request.body.password, 10)
  const selectUserQuery = `SELECT * FROM users WHERE name = '${name}'`
  const dbUser = await db.get(selectUserQuery)
  if (dbUser === undefined) {
    const createUserQuery = `
      INSERT INTO 
        users (name, email, password, address, phone) 
      VALUES 
        (
          '${name}', 
          '${email}',
          '${hashedPassword}', 
          '${address}',
          '${phone}'
        )`
    const dbResponse = await db.run(createUserQuery)
    const newUserId = dbResponse.lastID
    response.send(`Created new user with ${newUserId}`)
  } else {
    response.status = 400
    response.send('User already exists')
  }
})

//login API

app.post('/login/', async (request, response) => {
  const {name, password} = request.body
  const enquery = `SELECT * FROM users WHERE name = '${name}'`
  const dbuser = await db.get(enquery)
  if (dbuser === undefined) {
    response.status(400)
    response.send('Invalid user')
  } else {
    const ispassword = await bcrypt.compare(password, dbuser.password)
    if (ispassword === false) {
      response.status(400)
      response.send('Invalid password')
    } else {
      const payload = {name: name}
      let jwtToken = jwt.sign(payload, 'abcd')
      response.send({jwtToken})
    }
  }
})

//middleware function

const validation = (request, response, next) => {
  const Token = request.headers['authorization']
  if (Token === undefined) {
    response.status(401)
    response.send('Invalid JWT Token')
  } else {
    const jwtToken = Token.split(' ')[1]
    const verifyToken = jwt.verify(jwtToken, 'abcd', async (error, user) => {
      if (error) {
        response.status(401)
        response.send('Invalid JWT Token')
      } else {
        next()
      }
    })
  }
}

// GET API

app.get('/users/', validation, async (request, response) => {
  const getUsers = `SELECT * FROM users`
  const result = await db.all(getUsers)
  response.status(200)
  response.send(result)
})

//GET users by Id

app.get('/users/:userId/', validation, async (request, response) => {
  const {userId} = request.params
  const getuser = `SELECT * FROM state WHERE id = ${userId}`
  const result = await db.get(getuser)
  response.status(200)
  response.send(result)
})

// Delete user by id
app.delete('/user/:userId/', validation, async (request, response) => {
  const {userId} = request.params
  const deleteuser = `DELETE FROM users WHERE id = ${userId}`
  result = await db.run(deleteuser)
  response.status(200)
  response.send('user Removed')
})

//update user
app.put('/user/:userId/', validation, async (request, response) => {
  const {userId} = request.params
  const {name, email, address, phone} = request.body
  const updateuser = `UPDATE users SET name = '${name}', email = '${email}', address = '${address}', phone = '${phone}' WHERE id = ${userId}`
  await db.get(updateuser)
  response.status(200)
  response.send('User Details Updated')
})

module.exports = app
