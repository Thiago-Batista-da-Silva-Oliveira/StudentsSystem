import {useEffect, useState, useContext} from 'react'
import './academia.css'
import {AuthContext} from '../../contexts/auth.js' 
import axios from 'axios'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
function Academia () {
    const {students,fetchStudents, user} = useContext(AuthContext)

    const [grade1, setGrade1] = useState('')
    const [grade2, setGrade2] = useState('')
    const [frequency, setFrequency] = useState('')
    const [ isClicked, setIsClicked] = useState(false)
    const [student, setStudent] = useState([])
    const [inputSelected, setInputSelected] = useState(false)
    const teste = [students]
    const [changeClass, setChangeClass] = useState('')
   
   
    const handleDelete = async(id) => {
        try{
            await axios.delete(`http://localhost:5000/students/${id}`)
            
       } catch(error) {
           console.log(error)
       }
      
       }

   useEffect(() => {
    fetchStudents('academia')
   },[])

   const handleClick = (id) => {
    setIsClicked(true)
    const filter = students.filtered.filter((selected) => selected._id === id)
    setStudent(filter)
   }

   const handleChange = async (id,val1,val2,val3) => {
       const grade1 = val1===''?  student[0]?.grade1 : val1
       const grade2 = val2===''?  student[0]?.grade2 : val2
       const frequency = val3===''?  student[0]?.frequency : val3
       try{
            await axios.patch(`http://localhost:5000/students/${id}`, {grade1,grade2,frequency})
       } catch(error) {
           console.log(error)
       }
   }

   const info = []
  
   teste[0]?.filtered?.forEach((student) => {

    const data = {
        nome : student?.name,
        frequencia: student?.frequency,
        média: student?.grade2 ? (student?.grade1 + student?.grade2)/2 : student?.grade1
    }

    info.push(data)

    return info

   })

   const HandleClass = () => {
    fetchStudents(changeClass)
   }
 

 

    return (
        <>
          <input className="changeClassInput" placeholder="ex: 'academia2'" onChange={(e) => setChangeClass(e.target.value)} id='text' type="text" value={changeClass} />
          <button onClick={HandleClass}  className="changeClassButton" type="button">Alterar turma</button>
        
         <div className={isClicked? 'studentsContainer modal-open' : "studentsContainer"}>
             <div className="updateStudents">
           {students?.filtered?.map((info) => (
                   <div key={info._id} className="studentsCard">
                          {user?.isAdmin &&    <span className='deleteButton'  onClick={() => handleDelete(info._id)} >X</span>  }  
                       <span> {info.name}</span>
                      
                       <div className="grades">                         
                        <div className="grade">
                         <label >Primeira Nota</label>
                        <input  disabled value={info.grade1} placeholder={info.grade1} />
                        </div>

                        <div className="grade">
                         <label >Segunda Nota</label>
                        <input  disabled value={info.grade2} placeholder={info.grade2} />
                        </div>

                        
                        <div className="frequency">
                         <label htmlFor="frequency">Total de aulas</label>
                        <input  disabled id="frequency" value={info.frequency} placeholder={info.frequency} />
                        </div>
                       </div>

                     {user?.isAdmin && <button onClick={() => handleClick(info._id)}>Modificar</button> }  
                   </div>
           ))}
           </div>

           <div className="studentsData">
           <ResponsiveContainer  className="graf" width="100%" height="100%">
        <LineChart
         
          data={info}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <Line type="monotone" dataKey="frequencia" stroke="#5550bd"  />
          <Line type="monotone" dataKey="média" stroke="#5550bd"  />
          <Tooltip />
         
         
        </LineChart>
      </ResponsiveContainer>
      
           </div>
           
           </div>

           {isClicked && ( 
                   <>
                   <div className='modal'>
                       <span onClick={() => setIsClicked(false)}>X</span>
                 <h2>{student[0]?.name}</h2>
                 <form onSubmit={() => handleChange(student[0]?._id,grade1,grade2,frequency)}>
                 Primeira Nota<input onBlur={() => setInputSelected(true)} onChange={(e) => setGrade1(e.target.value) } value={inputSelected ? grade1 : student[0]?.grade1 } placeholder={student[0]?.grade1} />
                 Segunda Nota<input onChange={(e) => setGrade2(e.target.value) }  value={grade2} placeholder={student[0]?.grade2} />
                 Aulas participadas <input onChange={(e) => setFrequency(e.target.value) } value={frequency} placeholder={student[0]?.frequency} />
                 <button type="submit">Modificar</button>
                 </form>
                 </div>
                 </>
                ) }
        
        
        </>
    )
}

export default Academia