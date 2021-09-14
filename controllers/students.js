import Students from '../models/students.js'

export const register = async(req,res) => {

    const {name,studentclass} = req.body
    

 try{
    const existingStudent = await Students.findOne({name})

     const student = new Students({
         name: name,
         studentclass: studentclass,
         grade1: 0,
         grade2: 0,
         frequency: 0
     })

     const createdStudent = await student.save()
     res.json({createdStudent})

 } catch (error){
     console.log(error)
 }

}
 
export const getStudents = async(req,res) =>{
    const {studentclass} = req.params
    try{
        const allStudents = await Students.find()

        const filtered = allStudents.filter(info =>studentclass ===  info.studentclass)
       
        console.log(filtered)
        res.json({filtered})

    } catch(error){
        console.log(error)
    }
}

export const StudentGrade = async(req,res) => {
    const {id: _id} = req.params
    const {grade1, grade2, frequency} = req.body
    
    try {
    
       const student = await Students.findOne({_id})

       if(!student) return res.status(400).json({message:"User does not exist." })

       const updatedPost = await Students.findByIdAndUpdate(_id,{grade1, grade2,frequency}, {new:true})


       res.json({updatedPost})

    } catch (error) {
          console.log(error)
    }
}

export const DeleteStudent = async(req,res) => {
    const {id: _id} = req.params

    try {
        await Students.findByIdAndDelete(_id)
    } catch (error) {
        console.log(error)
    }
}