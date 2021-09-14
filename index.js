import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/users.js'
import studentsRoutes from './routes/students.js'

const app = express() 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
  res.send('hello, World!')
})

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/TBSO', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors())

app.use('/user', userRoutes)
app.use('/students',studentsRoutes )


/*if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
} */



const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
  })
    
