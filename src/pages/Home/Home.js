import React, { useContext,useState,useEffect } from 'react'
import './home.css'
import {AuthContext} from '../../contexts/auth.js' 
import axios from 'axios'
import {useHistory} from 'react-router-dom'

function Home() {
  const {user} = useContext(AuthContext)
  const history = useHistory()

  const [name, setName] = useState('')
  const [studentclass, setStudentclass] = useState('')
  const baseURL = "http://localhost:5000"

  useEffect(() => {
     
    if(!user){
      history.push('/')
    }
  }, [user,history]) 

  const handleClick =async () => {
     try{
       await axios.post(`${baseURL}/students`, {name, studentclass} )
     } catch(error){
        console.log(error)
     }
     setName('')
     setStudentclass('')
  }
  return (
      <>
      {//<Navbar />
}
      <div className="homeContainer">
        <div className="home">
          {user?.isAdmin ? (
           <>
            <div className="addCart">
              <h1>Adicione um Aluno</h1>
              <div className="addCartInfo">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" type="text" />
                  <input  value={studentclass} onChange={(e) => setStudentclass(e.target.value)} placeholder="Turma" type="text" />
                  <button onClick={handleClick} type="button">Adicionar</button>
              </div>
            </div>
           </>

          ) : (
                <span>oi {user?.name}</span>
          )}
    
        
          
         
          
        </div>
      </div>
      </>
  )
}

export default Home;