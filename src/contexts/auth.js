import {useState,createContext} from 'react'
import axios from "axios"
export const AuthContext = createContext({})

function AuthProvider({children}){

   const baseURL = 'http://localhost:5000/user'
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [students, setStudents] = useState([])
    const fetchStudents = async(course) => {
      try{
        const  {data}  = await axios.get(`http://localhost:5000/students/${course}`)
        setStudents(data)
      }
      catch(error){
        console.log(error)
      }
    }
    const fetchAuth = async (email,password,history) => {
        try {
          const  {data}  = await axios.post(`${baseURL}/signin`,{email,password})
          localStorage.setItem('profile', JSON.stringify(data))
          setUser(JSON.parse(localStorage.getItem('profile')))
          console.log(user)
            history.push('/home')
      
          
        } catch (error) {
          console.error(error);
        }
      };

      const signOut = () => {
        setUser()
        localStorage.removeItem('profile')
       
      }
      const signUp = async (name,email,password,history) => {
        try {
          const  {data}  = await axios.post(`${baseURL}/register`,{name,email,password})
          localStorage.setItem('profile', JSON.stringify(data))
          setUser(JSON.parse(localStorage.getItem('profile')))
          history.push('/home')
        } catch (error) {
          console.error(error);
        }
      };

    

      return(
     <AuthContext.Provider value={{
        fetchAuth,
        user,
        signUp,
        fetchStudents,
        students,
        signOut
}
}
    >
       {children}
     </AuthContext.Provider>
    )
}
export default AuthProvider