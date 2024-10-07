import { FriendComponent } from "@/components/FriendComponent"
import { InputCard } from "@/components/InputCard"
import { useFriendsContext } from "@/contexts/FriendsContext"
import { makeProtectedGetRequest } from "@/utils/makeProtectedGetRequest"
import { MakeProtectedPostRequest } from "@/utils/makeProtectedPostRequest"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
type Friend = {
    name:string, 
    relationship:string
}
export const Friends = () => { 
    const {friends, setFriends} = useFriendsContext(); 
    const {user, isLoading, getAccessTokenSilently} = useAuth0(); 
    const [fetched, setFetched] = useState<boolean>(false); 
    
    useEffect(() =>{
       const makeReq = async () =>{
        if(!isLoading){
            console.log("user is", user); 
            const token = await getAccessTokenSilently(); 
            const toFetch = {
                userName: user!.name
            }; 

            const data = await MakeProtectedPostRequest('/api/getFriends',toFetch, token); 
            setFriends(data.data[0].friends);
            setFetched
            setFetched(true);
            return  
        }
        if(fetched){
            return; 
        }
       }
       makeReq().then(); 
      

    }, [window]); 
    return(
        <>
       
        <div className="h-screen w-full font-poppins  grid grid-cols-2">
            <div className = "flex flex-row  justify-center col-span-1 mt-10">
                 <InputCard/>
            </div>
        <div className = "flex flex-row  justify-center col-span-1">
                
            <div className = "text-left text-3xl ml-5 mt-10">
                Your friends: 
                {friends.map((item) =>{ 
                        return(
                            <FriendComponent name = {(item as Friend).name} photoURL="" relation={(item as Friend).relationship}/>
                        )
                })}
                
            </div>        
        </div>
           
           
        </div>
        </>
    )
}   