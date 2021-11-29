const fs = require('fs')
const { get } = require('http')

const { join } = require('path')

const filePath = join(__dirname, 'users.json')

const getUsers = () => {
  const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : []

  try {
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoutes = (app) => {
  app.route('/users/:id?')
    .get((req, res) => {
      const users = getUsers()
      res.send({ users })
    })
    .post((req, res) => {
      const users = getUsers()

      users.push(req.body)
      console.log(req.body)
      saveUser(users)
      res.status(201).send('Ok')
    })
    .put((req, res) => {
      const users = getUsers()

      saveUser(users.map(user => {
        if (user.id === req.params.id && user.name !== req.body.name) {
          user.name = req.body.name

        }
        return user
      }))
      res.status(201).send('Atualizado')
    })
    .delete((req, res) => {
      const users = getUsers()

      saveUser(users.filter(user => user.id !== req.params.id))
      res.status(200).send('Deletado')
    })
}

module.exports = userRoutes