  
import bcrypt from 'bcryptjs'


import User from '../models/user.js'



export const signin = async (req,res) => {
  const {email, password} = req.body

  try{
    const existingUser = await User.findOne({email})

    if (!existingUser) return  res.status(404).json({message: "User does not exist"})

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})


    res.status(200).json({result: existingUser})
  } catch(error) {
    res.status(500).json({message: "Something went wrong"})
  }
}

export const signup = async (req,res) => {
   const {name,email,password} = req.body

   try {
        const existingUser = await User.findOne({email})

        if(existingUser) return res.status(400).json({message:"User already exists." })

        const hashedPassword = await bcrypt.hash(password, 8)

        const result = await User.create({name, email, password:hashedPassword})


        res.status(200).json(result)


   } catch(error) {
    res.status(500).json({message: "Something went wrong"})
    console.log(error);
   }
} 