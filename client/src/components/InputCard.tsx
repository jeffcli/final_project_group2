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


import { useState } from "react"
import { Button } from "./ui/button"
  export const InputCard = () => { 
    const [open, setOpen] = useState<boolean>(false); 
    const [value, setValue] = useState<string>(''); 
    const [relationship, setRelationship] = useState<string>(''); 
    const options = [
        {
            value:"Dante Giles", 
            label:"Dante Giles"
        }, 
        {
            value:"Carter Moore", 
            label:"Carter Moore"
        },  
        {
            value:"Vivek Jagadeesh", 
            label:"Vivek Jagadeesh"
        }, 
        {
            value:"Jack Rooney", 
            label: "Jack Rooney"
        }, 
        {
            value: "Seth McGowan", 
            label:"Seth McGowan"
        }, 
        {
            value:"Ace Beattie", 
            label: "Ace Beattie"
        }
      ]
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
                             {value? options.find((person) => person.value === value)?.label: "Select a friend to add" }
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0">
                <Command>
                    <CommandInput placeholder="Pick a friend to add: "/>
                    <CommandList>
                        <CommandEmpty>No Friends Found</CommandEmpty>
                        <CommandGroup>
                            {options.map((person) => { 
                                return(
                                    <CommandItem key ={person.value} value = {person.value} onSelect={(selectedValue) => {
                                        setValue(selectedValue === value ? "":selectedValue); 
                                        setOpen(false); 
                                    }}
                                        >
                                            <img className=" h-8 rounded-sm aspect-square object-cover mr-5 " src={photo} alt="Alt" />
                                           {person.label}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
            </Popover>
            <Input  className = " mt-5 w-80" placeholder="Enter relationship type" value={relationship} onChange={(e) => setRelationship(e.target.value)}/>
            <div className = "mt-5  ">
                <p className="text-2xl font-bold mb-5">Connect with other users!</p>
           
                <div className="text-left font-lg">
                    {options.map((person) => { 
                        return(
                            <div className="flex flex-col items-start mb-2">
                                <div className="flex flex-row flex-wrap justify-between w-full">
                                    <img className=" h-8 rounded-sm aspect-square object-cover mr-5 " src={photo} alt="Alt" />
                                    <p className="text-lg ">{person.label}</p>
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