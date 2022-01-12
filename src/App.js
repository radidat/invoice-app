import './App.css';
import DisplayHeader from './components/DisplayHeader'; 
import Main from './site-pages/Main';
import {createGlobalStyle} from 'styled-components'; 
import {Route, Switch} from 'react-router-dom'; 
import InvoiceDetail from './components/InvoiceDetail';
import EditInvoice from './components/EditInvoice'; 
import NewInvoice from './components/NewInvoice';
import SignIn from './components/connexion/SignIn';
import SignUp from './components/connexion/SignUp';
import PrivateRoute from './components/PrivateRoute';
import ChangePassword from './components/ChangePassword'; 
import ProfileUser from './components/ProfileUser';
import ResetPassword from './components/connexion/ResetPassword';
import { useDarkMode } from './context/DarkModeContext';
function App() {

  const {storageMode} = useDarkMode();
  return (
    <div className="App">
      <GlobalStyle darkMode={storageMode} />
      <DisplayHeader/>
      <div>
        <Switch>
          <PrivateRoute exact path='/' Component ={Main}/>
          <PrivateRoute exact path='/filter/:filterInvoice' Component ={Main}/>
          <PrivateRoute exact path='/invoiceDetail/:id' Component ={InvoiceDetail}/>
          <PrivateRoute exact path='/newInvoice' Component ={NewInvoice}/>
          <PrivateRoute exact path='/editInvoice/:id' Component ={EditInvoice}/>
          <PrivateRoute exact path='/profileUser' Component ={ProfileUser}/>
          <Route exact path='/signup' children={()=> <SignUp/>}/>
          <Route exact path='/signin' children={()=> <SignIn/>}/>
          <Route exact path='/changePassword' children={()=><ResetPassword/>}/>
        </Switch>
      </div>
    </div>
);
}

const GlobalStyle= createGlobalStyle`
 
button, a {
  text-decoration:none;
  cursor: pointer;
}
body{ 
 background: ${props =>props.darkMode  ? '#141625': '#ffff' };
 color: ${props =>props.darkMode  ? 'white': 'black' }
}
`
export default App;
