interface Props{
    open:boolean;
    setOpen: (state:boolean) => void; 
    addQuote:  (quote:string) => void; 
}
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { MakeProtectedPostRequest } from "@/utils/makeProtectedPostRequest";
import { useAuth0 } from "@auth0/auth0-react";
import { useFriendsContext } from "@/contexts/FriendsContext";
import { toast } from "sonner";
export const QuoteModal = (props:Props) => { 
    const {getAccessTokenSilently} = useAuth0(); 
    const {user} = useAuth0(); 
    const {setFriends} = useFriendsContext(); 
    const [quote, setQuote] = useState<string>(''); 
    // const handleSubmit = async(e:React.FormEvent) => { 
    //     e.preventDefault(); 
    //     props.addFriend(props.name, updateRelationship ); 
    //     toast.success(`Added ${props.name}`); 
    //     props.setOpen(false); 

    // }
    const handleSubmit = async (e:React.FormEvent) => { 
       e.preventDefault(); 
       props.addQuote(quote); 
       toast.success('Quote added!'); 
       props.setOpen(false); 
    }
    return(
        <Dialog open={props.open} onOpenChange={() => props.open? props.setOpen(false): props.setOpen(true)}>

            <DialogContent>
                <DialogHeader className = "text-3xl text-center">
                    <DialogTitle className = "text-center text-2xl">{`Add a quote!`}</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => handleSubmit}>
                <Input placeholder={`Enter your quote!: `} onChange={(e) => setQuote(e.target.value)}/>
                <div className = "flex flex-row items-center justify-center mt-5">
                    <Button onClick = {(e) => handleSubmit(e)}className = "mr-5 w-28"> Submit</Button>
                </div>
                </form>
            </DialogContent>

        </Dialog>

    )


}