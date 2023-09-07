import { useSelector,useDispatch } from "react-redux"
import { useGetUserQuery,useSetNickMutation} from "../Redux/api"
// import { useSetPasswordMutation } from "../Redux/passwordApi"
import { ActionSetPassword } from "../Redux/thunk"

import UserPage from "./userPage"

const WrapperUser = ()=>{
    const auth = useSelector( state => state.auth ) 
    const dispatch = useDispatch()

    const sub = auth.user?.sub
    const _id = sub.id 

    const {data : payload,refetch} = useGetUserQuery(_id)
    const userInfo = payload?.UserFindOne

    const [nickQuery,isLoading] = useSetNickMutation()
    // const [passwordQuery,isLoad] = useSetPasswordMutation()

    const handleNewNick = async (nickName) => {
        const {data} = await nickQuery({
         _id:auth.user?.sub?.id ,
         nick: nickName
        })
        console.log(data)
        if(data){
            refetch() // This will trigger a new network request to get the latest data.
        }
    }

    // const handlePassword = async ({login,currentPassword="jo1",newPassword="1111"}) =>{
    //     const {data} = await passwordQuery({
    //         login: login,
    //         currentPassword: currentPassword,   
    //         newPassword : newPassword
           
    //     })
    //     console.log(data,login,currentPassword,newPassword)
    //     if(data){
    //         refetch()
    //     }
    // }
    const handlePassword = (user) => {
        dispatch(ActionSetPassword(user))
    } 

    return <>
       { userInfo  && <UserPage
        userInfo={userInfo}
        handleNewNick={handleNewNick}
        handlePassword={handlePassword}

        ></UserPage>
       }
    </>
}

export default WrapperUser;