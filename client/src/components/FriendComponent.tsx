import photo from "../assets/Dante_test_photo.jpg"; 

interface props{
    name:string; 
    photoURL:string; 
    relation:string; 
}
import { Separator } from "@/components/ui/separator"
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";


export const FriendComponent = (props:props) => { 
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
                    <Button className="ml-5" > Update Friend </Button>
                    <Button className="ml-5 items-c" variant="destructive"> Remove Friend </Button>
                </div>
            
            </div>
        </div> 
    )

}