import './App.css';
import {Router, Route,Switch} from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import {persistor, store} from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react';

import history from './components/history';
import PrivateRoute from './Route/privatRoute';

import ErrorPage  from './components/errorPage';
import ResponsiveAppBar from './components/header/header';
import PlaylistItem from './components/main/contentPage/playlistItem';
import SignIn from './components/loginPage';
import SignUp from './components/signUpPage';
import WrapperPlaylists from './components/main/contentPage/wrapperPlaylists';
import WrapperPlayer from './components/footer/wrapperPlayer';
import Menu from './components/main/aside/Menu';
import WrapperUser from './components/wrapperUser';


import { AppContextProvider } from './components/context';
import Dnd from './components/globals/dnd';
import CreatePlaylistForm from './forms/forms';



function App() {
  return (
      <div className="App">
        <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <Router history={history}>
            
            <AppContextProvider>
              <header><ResponsiveAppBar/></header>
              <div className='container'>
              <aside className='aside'>
                <Menu ></Menu>
              </aside>
              <main>
              
              
              <Switch> 
                <PrivateRoute path="/playlist" component={WrapperPlaylists} exact></PrivateRoute>
                <PrivateRoute path="/playlist/:id" component={PlaylistItem}/>
                <PrivateRoute path="/create" component={CreatePlaylistForm}/>


                <Route path="/login" component={SignIn}></Route>
                <Route path="/registration" component={SignUp}></Route>
                <Route path="/user/:id" component={WrapperUser}></Route>
                <Route path="/404" component={ErrorPage}></Route>

              </Switch>



              </main>
              
              </div>
              <footer className='footer'>
              <WrapperPlayer></WrapperPlayer>
              </footer>
            </AppContextProvider>
          </Router>
        {/* </PersistGate>   */}
        </Provider>

          
      </div>
  );
}

export default App;

// const LoginForm = ({onLogin}) => {
//     const [login,setLogin] = useState("")
//     const [password,setPassword] = useState("")
//     const checkButton = !((login.length > 0) && (password.length > 0))
//     //тут надо два состояния - для логина и для пароля;
//     //кнопка логина должна быть disabled если одно из полей пустое
//     //по клику на кнопку запустить onLogin и передать туда 
//     //текущее состояние login и password
//     return (
//         <form>
//             <label>UserName</label>
//             <input type="text"  value={login} 
//             onChange ={e=>setLogin(e.target.value)}/>

//             <label>Password</label>
//             <input type="text"  value={password}
//             onChange={e=>setPassword(e.target.value)}/>

//             <input type="submit" value="Submit" onClick={()=>{
//                 onLogin({login,password})}} disabled={checkButton} />
//         </form>
//     )
// }
    
