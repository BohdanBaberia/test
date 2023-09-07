
import { useSelector } from "react-redux";
import { jwtDecode } from "../Redux/api";
import { Redirect, Route } from "react-router-dom";
import { store } from "../Redux/store";



// function IsAuth() {
//     const auth = useSelector(state=>state.auth)
//     const token = auth?.token
//       try {
//         const decode = jwtDecode(token)
//         console.log(decode)
//         return true
//       } 
//       catch (error) {
//         return false
//       }
    
//   }
  
function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          (store.getState()?.auth?.token) ? (
            <Component {...props} />
          ) : (
           <Redirect to="/login"/>
          )
        }
      />
    );
  }

  export default PrivateRoute;