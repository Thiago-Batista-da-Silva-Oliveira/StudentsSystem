import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./auth.css";
import {AuthContext} from '../../contexts/auth.js' 

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
  const {fetchAuth,user,signUp } = useContext(AuthContext)
  const switchMode = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(isSignup){
      signUp(name,email,password,history)
      
  
    } else{
      fetchAuth(email,password,history)
    }
   
    
  }

  useEffect(() =>{
    if(user){
      history.push('/home')
    }  
    
  
 }, [history, user])  



  return (
    <>
    
      <div className="Auth-Container">
        <div className="auth">
          <div className="auth-logo">TBSO</div>
          <span>{isSignup ? "Inscreva-se" : "Entrar"}</span>
          <form onSubmit={handleSubmit} className="form">
            {isSignup && (
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="primeiro nome"
                required
                maxLength="9"
              />
            )}

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="email"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="senha"
              required
            />
             <div className="button-auth">
            <button type="submit">{isSignup ? 'Inscreva-se' : "Entrar"}</button>
            </div>
          </form>
          <button className="toggle-button" onClick={switchMode}>
            {isSignup ? "Já tem uma conta ?" : "Criar uma conta"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Auth;
