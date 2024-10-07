import { createContext, useContext, useState} from "react";

interface FriendsContextType{
    friends:Object[]; 
    setFriends: (friends:Object[]) => void; 
}
const initialContextValue = {
    friends:[], 
    setFriends: () =>{}
}; 
const FriendsContext = createContext<FriendsContextType>(initialContextValue); 
export const useFriendsContext = () => {
    const context = useContext(FriendsContext); 
    return context; 
}
interface Props{
    children:React.ReactNode 
}; 
export const FriendsProvider = (props:Props) => {
    const [friends, setFriends] = useState<Object[]>([]); 
    const setFriendsEvent = (friendsItem:Object[]) =>{
        console.log("friends are", friendsItem); 
        setFriends(friendsItem); 
    }; 
    const value:FriendsContextType = {
        friends:friends, 
        setFriends: setFriendsEvent
    }
    return (
        <FriendsContext.Provider value = {value}>
            {props.children}
        </FriendsContext.Provider>
    )
}
