import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import photo from "../assets/default-photo.jpeg"; 
  import { Input } from "@/components/ui/input"
  import axios from 'axios'; 


import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react";
import { MakeProtectedPostRequest } from "@/utils/makeProtectedPostRequest";
import { toast } from "sonner";
import { FriendsProvider, useFriendsContext } from "@/contexts/FriendsContext";
import { makeProtectedGetRequest } from "@/utils/makeProtectedGetRequest";
  export const InputCard = () => { 

    const [users, setUsers] = useState<string[]>([]); 
    const {user, getAccessTokenSilently} = useAuth0(); 

    useEffect(() => { 
        const makeReq = async () => { 
            const token = await getAccessTokenSilently(); 
            const data = await makeProtectedGetRequest('/api/getUsers',token ); 
            console.log(data.data); 
            setUsers(data.data); 

        }
        makeReq().then()
    }, [window]); 
    const {setFriends} = useFriendsContext(); 
    const [open, setOpen] = useState<boolean>(false); 
    const [value, setValue] = useState<string>(''); 
    const [relationship, setRelationship] = useState<string>(''); 
    const handleClear = () =>{
        setValue(''); 
        setRelationship('') ;
        setOpen(false);
    }
    const handleSubmit = async () =>{
        const friendItem = {
            "createdBy": user!.name, 
            "toAdd": value,
            "relationship":relationship, 
        }; 
        const token = await getAccessTokenSilently(); 
        const data = await MakeProtectedPostRequest('/api/addFriend', friendItem, token); 
        toast.success('Friend Added!'); 
        console.log("data is", data.data[0].friends); 
        setFriends(data.data[0].friends); 
        

    
    }
   
    return(
    <div className="h-full w-4/5 ml-5  text-center ">
        <Card className="shadow-2xl">
            <CardHeader>
                <CardTitle className="text-3xl">Add a friend!</CardTitle>
                <CardDescription>Keep track of your friends and their wellness status</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex flex-col items-center">
                    <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                         <Button variant="outline" role="combobox" aria-expanded={open} className = "w-80 justify-between">
                             {value? users.find((person) => person === value): "Select a friend to add" }
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0">
                <Command>
                    <CommandInput placeholder="Pick a friend to add: "/>
                    <CommandList>
                        <CommandEmpty>No Friends Found</CommandEmpty>
                        <CommandGroup>
                            {users.map((person) => { 
                                return(
                                    <CommandItem key ={person} value = {person} onSelect={(selectedValue) => {
                                        setValue(selectedValue === value ? "":selectedValue); 
                                        setOpen(false); 
                                    }}
                                        >
                                            <img className=" h-8 rounded-sm aspect-square object-cover mr-5 " src={photo} alt="User photo" />
                                           {person}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
            </Popover>
            <Input  className = " mt-5 w-80" placeholder="Enter relationship type" value={relationship} onChange={(e) => setRelationship(e.target.value)}/>
            <div className = "flex flex-row items-center mt-3">
                <Button onClick={handleClear} variant="destructive" className ="mr-3 w-20">Clear</Button>
                <Button onClick={handleSubmit} className="w-20">Submit</Button>
            </div>            
            <div className = "mt-5  ">
                <p className="text-2xl font-bold mb-5">Connect with other users!</p>
           
                <div className="text-left font-lg">
                    {users.map((person) => { 
                        return(
                            <div className="flex flex-col items-start mb-2">
                                <div className="flex flex-row flex-wrap justify-between w-full">
                                    <img className=" h-8 rounded-sm aspect-square object-cover mr-5 " src={photo} alt="Alt" />
                                    <p className="text-lg ">{person}</p>
                                    <Button className="flex ml-auto">Add friend</Button>
                                </div>
                            </div>
                            
                            
                        )
                    })}
               
               </div>
            </div>
           
           
        </div>
       
        
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
        </div>
    )
  }