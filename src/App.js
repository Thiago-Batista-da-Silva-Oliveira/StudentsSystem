import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Curso from "./pages/Curso/Curso";
import Formadores from "./pages/Formadores/Formadores";
import AuthProvider from './contexts/auth.js'
import Navbar from "./components/Navbar/Navbar";
import './index.css'

import Academia from "./pages/Academia/Academia";



function App() {


  return (
    <>

    
     <AuthProvider>
      
    <BrowserRouter>
         <>
         <div className="appContainer">
         <div className= 'flex1'  >
       <Navbar />
       </div>
     
         <Switch>
         <div className="flex4">
           <Route path="/home" exact component={Home}/>
           <Route path="/curso" exact component={Curso}/>
           <Route path="/formadores" exact component={Formadores}/>
           <Route path="/academia" exact component={Academia}/>
           <Route path="/" exact component={Auth}/>
           </div>
          
         
        
         </Switch>
        
         </div>
         </>
   
      
        
      
       
        </BrowserRouter> 
       
        </AuthProvider>
    </>
     
   )

  
  
}

export default App;
