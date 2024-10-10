import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MakeProtectedPostRequest } from "@/utils/makeProtectedPostRequest";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import TrashIcon from '../assets/trash.svg';

type Habit = {
  userName: string,
  description: string,
  created: string,
  completed: string[],
  _id: string
}  

export default function AddHabitForm(props: {getHabits: () => void, habits: Habit[]}) {
    const {user, getAccessTokenSilently} = useAuth0(); 
  
    const removeHabit = async (habitId: string) => {
      try {
        const token = await getAccessTokenSilently(); 
    
        const bodyData = {
          _id: habitId
      }; 
  
        const data = await MakeProtectedPostRequest('/api/deleteHabit', bodyData, token); 
        props.getHabits();
      } catch (e) {
        console.log("Error removing habit: ", e);
      }
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
        </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Habits</DialogTitle>
        </DialogHeader>
        {props.habits.map((habit: Habit) => {
          return (
        <div className="grid gap-4 py-1">
          <div className="flex justify-end gap-4">
            <Label className="text-right col-span-2 self-center">
              {habit.description}
            </Label>
            <Button
              id="name"
              variant='destructive'
              className=""
              onClick={() => removeHabit(habit._id)}
              size="icon"
            >
              <img src={TrashIcon} className="p-2"/>
            </Button>
          </div>
        </div>
          )
        })}
        
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="default">Close</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
