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

export default function AddHabitForm(props: {getHabits: () => void}) {
    const {user, getAccessTokenSilently} = useAuth0(); 
    const [habitName, setHabitName] = useState<string>("");
  
    const addHabit = async () => {
      try {
        const token = await getAccessTokenSilently(); 
    
        const bodyData = {
            userName: user!.name,
            created: new Date().toDateString(),
            description: habitName,
      }; 
  
        const data = await MakeProtectedPostRequest('/api/addHabit', bodyData, token); 
        props.getHabits();
      } catch (e) {
        console.log("Error adding habit: ", e);
      }
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="default">Add Habit</Button>
        </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Habit</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Habit Name
            </Label>
            <Input
              id="name"
              value={habitName}
              placeholder="Make my bed"
              className="col-span-3"
              onChange={(event) => {setHabitName(event.target.value)}}
            />
          </div>
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button type="submit" onClick={addHabit}>Save</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
