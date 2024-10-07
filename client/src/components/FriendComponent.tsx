import photo from "../assets/default-photo.jpeg"; 
interface props{
    name:string; 
    photoURL:string; 
    relation:string; 
}
import { Separator } from "@/components/ui/separator"
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { MakeProtectedPostRequest } from "@/utils/makeProtectedPostRequest";
import { useFriendsContext } from "@/contexts/FriendsContext";
import { useState } from "react";
import { UpdateFriendModal } from "./UpdateFriendModal";
import { toast } from "sonner";
export const FriendComponent = (props:props) => { 
    const [modalOpen, setModalOpen] = useState<boolean>(false); 
    const {user, getAccessTokenSilently} = useAuth0(); 
    const {setFriends} = useFriendsContext(); 
    const handleDelete = async (toRemove:string) => { 
        const token = await getAccessTokenSilently(); 
        //start by building the JSON 
        const removeUser = {
            toRemove: toRemove, 
            userName:user!.name
        }; 
        const data = await MakeProtectedPostRequest('/api/removeFriend', removeUser, token ); 
        console.log("removed", data.data); 
        setFriends(data.data); 
        toast.success(`Removed ${props.name}`); 
        location.reload(); 
        
        
        return; 
    }
    return(
        <div>
            <Separator/>
            <div className="flex flex-row items-center   mt-2 mb-2 justify-between  ml-auto"> 
                <img className=" h-20 rounded-full aspect-square object-cover " src={photo} alt={props.name} />
                <div className = "flex flex-col items-start ml-5">
                    <p className="font-poppins">{props.name}</p>
                    <p className=" relative text-right text-lg ">{props.relation}</p>
                </div>
                    <div className="flex ml-auto items-center">

                    <Progress value={10} className=" ml-10 w-36"/> 
                    <Button  onClick={() => setModalOpen(true )} className="ml-5" > Update Friend </Button>
                    <Button onClick={() => handleDelete(props.name)} className="ml-5 items-c" variant="destructive"> Remove Friend </Button>
                </div>
            
            </div>
            <UpdateFriendModal open={modalOpen} name = {props.name} setOpen={(state) => setModalOpen(state)} deleteFriend={handleDelete}/>
        </div> 
    )

}