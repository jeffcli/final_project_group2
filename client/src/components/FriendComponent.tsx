import photo from "../assets/default-photo.jpeg"; 
interface props{
    name:string; 
    photoURL:string; 
    relation:string; 
}
import axios from 'axios'; 
import { Separator } from "@/components/ui/separator"
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { MakeProtectedPostRequest } from "@/utils/makeProtectedPostRequest";
import { useFriendsContext } from "@/contexts/FriendsContext";
import { useEffect, useState } from "react";
import { UpdateFriendModal } from "./UpdateFriendModal";
import { toast } from "sonner";
import TrashIcon from "../assets/trash.svg";
import SmileIcon from "../assets/smile-circle-svgrepo-com.svg";
import AverageFace from "../assets/neutral-face.svg";
import FrownFace from "../assets/frown-face.svg";
export const FriendComponent = (props:props) => { 
    const [modalOpen, setModalOpen] = useState<boolean>(false); 
    const {user, getAccessTokenSilently} = useAuth0(); 
    const [mood, setMood] = useState<number>(0); 
    const {setFriends} = useFriendsContext(); 
    const handleDelete = async (toRemove:string) => { 
        const token = await getAccessTokenSilently(); 
        //start by building the JSON 
        const removeUser = {
            toRemove: toRemove, 
            userName:user!.name
        }; 
        const data = await MakeProtectedPostRequest('/api/removeFriend', removeUser, token ); 
        setFriends(data.data); 
        toast.success(`Removed ${props.name}`); 
    
        return; 
    }
    useEffect(() => { 
        const makeReq = async () => { 
            const query = {
                "userName": props.name
            }; 
            const data = await axios.post('/api/getMoodForUser', query); 
            console.log("yoink", data.data[0].moods); 
            const today = new Date(); 
            const dayOfWeek = today.getDay(); 
            const mood = data.data[0].moods[dayOfWeek]; 
            console.log("Set", mood, data.data[0].moods); 
            if(mood){
                console.log("here"); 
                setMood(mood)
            }; 


        }; 
        makeReq().then(); 
    }, [window]); 
    useEffect(() => {
        console.log(mood); 
    }, [mood])
    return(
        <div>
            <Separator/>
            <div className="flex flex-row items-center mt-2 mb-2 justify-between  ml-auto"> 
                <img className=" h-20 rounded-full aspect-square object-cover " src={photo} alt={props.name} />
                <div className = "flex flex-col items-start ml-5">
                    <p className="font-poppins">{props.name}</p>
                    <p className=" relative text-right text-lg ">{props.relation}</p>
                </div>
                    <div className="flex ml-auto items-center">
                   
                   <div className="mx-2 ml-4 flex flex-col justify-center">
                    <img src={mood < 4 ? FrownFace : mood < 8 ? AverageFace : SmileIcon} className="h-10 w-10 mx-auto"/>
                    <p className="text-lg font-bold">Mood</p>
                   </div>

                    <Button  onClick={() => setModalOpen(true )} className="ml-5" > Update </Button>
                    <Button onClick={() => handleDelete(props.name)} className="ml-5 items-c" variant="destructive" size="icon">
                        <img src={TrashIcon} className="p-2"/>
                    </Button>
                </div>
            
            </div>
            <UpdateFriendModal open={modalOpen} name = {props.name} setOpen={(state) => setModalOpen(state)} deleteFriend={handleDelete}/>
        </div> 
    )

}