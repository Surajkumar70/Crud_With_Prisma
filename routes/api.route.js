const { PrismaClient } = require('@prisma/client');
const prisma= new PrismaClient()
const router = require('express').Router();

//Check Api is working or not 

router.get('/', async (req, res) => {
  res.send({ message: 'Ok api is working 🚀' });
});

//First register yourself then you can register if this register id already there then already exists

router.post('/create', async (req, res) => {
  const { name, email, password } = req.body
  try {
      const user = await prisma.users.findUnique({
          where: { email }
      })
      if (user == null){
          const data = await prisma.users.create({
              data:{name, email, password}
          })
           res.status(200).json({title:"successfully registered ", message:data})
      }
      res.send('data already exists')
  } catch (error) {
      res.status({
          status:500, msg:error.message
      })
  }
})

// Cheak your data by email or Password exists then login not exists then show register first 

router.post('/login', async (req, res)=>{
  const {email, password} = req.body
  try {
      const user = await prisma.users.findMany({
          where:{email, password}
      })
      if (user.length == 1){
          return res.send('logged in success')
      }
      res.send('register first')
  } catch (error) {
      res.status({
          status:500, msg:error.message
      })
  }
})

// Update your name by ID

router.patch('/update/:id', async (req, res)=>{
  const {name} = req.body
  try {
      const user =  await prisma.users.update({
          where:{id:Number(req.params.id)},
          data:{name}
      })
      res.send(user)
  } catch (error) {
      res.send(error.message)
  }
})

 //Delete any data from Email

router.delete('/delete', async(req, res)=>{
  const {email} = req.body
  try {
      await prisma.users.delete({
          where:{email}
      })
      res.send('deleted')
  } catch (error) {
      res.send(error.message)
  }
})

// Read All data 

router.get('/read', async(req, res)=>{
  const data =  await prisma.users.findMany()
  res.send(data)
})

module.exports = router;