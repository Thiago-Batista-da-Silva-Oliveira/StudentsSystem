import { Link, useHistory} from 'react-router-dom';
import './navbar.css'
import React, { useContext,useState  } from 'react'
import {AuthContext} from '../../contexts/auth.js'
function Navbar() {
    const {user,signOut} = useContext(AuthContext)
    const history = useHistory()

    const Redirect = () => {
        history.push('/home')
    }
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
      setToggle((prev) => !prev)
  }
  return (
      <>
      <div className='navbar'>
          <div onClick={Redirect} className="profile">
              <div className="img">{user?.name?.charAt(0)}</div>
              <span>{user?.name}</span>
              {!user && "Entrar"}
          </div>
          {user &&    <span  onClick={signOut} className="desconectar">Sair</span> } 
          <div className="infos">
            <div className="infos-section"> 
            <Link to="/home">
            <span>Adicionar</span>
            </Link>
            <Link to="/formadores">
            <span>Formadores de Heróis</span>
            </Link>
            <Link to="/academia">
             <span>Academia das Àguias</span>
             </Link>
             <Link to="/curso">
             <span>Curso</span>
             </Link>
          
            </div>
            <div className="infos-contacts">
                <span><i class="fab fa-facebook-f"></i>: Thiago Oliveira</span>
                <span><i class="fab fa-instagram"></i>: Thiago Oliveira</span>
                <span><i class="fab fa-whatsapp"></i>: 967163455</span>
            </div> 
         </div>
      </div>
     {!toggle && <div onClick={handleToggle} className="toggle"><i class="fas fa-bars"></i></div>}
     {toggle && <div onClick={handleToggle} className="toggle"><i class="fas fa-times"></i></div>}

     <div className={toggle ? 'navbar-mobile active' : 'navbar-mobile'}>
          <div onClick={Redirect} className="profile">
              <div className="img">{user?.name?.charAt(0)}</div>
              <span>{user?.name}</span>
              {!user && "Entrar"}
          </div>
          {user &&    <span  onClick={signOut} className={toggle ? 'desconectar-mobile' : 'none'}>Sair</span> } 
          <div className="infos">
            <div className="infos-section"> 
            <Link to="/home">
            <span  onClick={handleToggle} >Adicionar</span>
            </Link>
            <Link to="/formadores">
            <span  onClick={handleToggle} >Formadores de Heróis</span>
            </Link>
            <Link to="/academia">
             <span  onClick={handleToggle} >Academia das Àguias</span>
             </Link>
             <Link to="/curso">
             <span  onClick={handleToggle} >Curso</span>
             </Link>
          
            </div>
            <div className="infos-contacts">
                <span><i class="fab fa-facebook-f"></i>: Thiago Oliveira</span>
                <span><i class="fab fa-instagram"></i>: Thiago Oliveira</span>
                <span><i class="fab fa-whatsapp"></i>: 967163455</span>
            </div> 
         </div>
      </div>
      </>
  )
}

export default Navbar;