import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react";
import { makeProtectedGetRequest } from "@/utils/makeProtectedGetRequest"
import { Checkbox } from "@/components/ui/checkbox";
import { MakeProtectedPostRequest } from "@/utils/makeProtectedPostRequest";
import { Button } from "@/components/ui/button";
import HabitElement from "@/components/HabitElement";
import AddHabitForm from "@/components/AddHabitForm";
import EditHabitsForm from "@/components/EditHabitsForm";
import HabitHistoryTable from "@/components/HabitHistoryTable";

type Habit = {
  userName: string,
  description: string,
  created: string,
  completed: string[],
  _id: string
}

export default function Habits() {
  const {user, getAccessTokenSilently} = useAuth0(); 
  const [userHabits, setUserHabits] = useState<[]>([]);

  const getHabits = async () => {
    try {
      const token = await getAccessTokenSilently(); 
  
      const toFetch = {
        userName: user!.name
    }; 

      const data = await MakeProtectedPostRequest('/api/getHabits',toFetch, token); 
      console.log(data.data[0]);
      setUserHabits(data.data);
    } catch (e) {
      console.log("Error getting habits: ", e);
    }
  }

  const updateHabit = async (habitId: string, done: boolean) => {
    try {
      const token = await getAccessTokenSilently(); 
  
      console.log(habitId);
      console.log(done);
      const toUpdate = {
        _id: habitId,
        done: done,
        userName: user!.name
    }; 

      const data = await MakeProtectedPostRequest('/api/updateHabit',toUpdate, token); 
      setUserHabits(data.data);
    } catch (e) {
      console.log("Error getting habits: ", e);
    }
  }

  useEffect(() => {
    getHabits().then();
  }, [window])


  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="my-3 mb-7 flex flex-row justify-between">
        <div>
          <h1 className="font-extrabold text-4xl">Habit Tracker</h1>
          <sub className="font-light text-xl">Today</sub>
        </div>
        <div className="mt-auto flex flex-row-reverse gap-2">
          <AddHabitForm getHabits={getHabits}/>
          <EditHabitsForm habits={userHabits} getHabits={getHabits}/>
        </div>

      </div>
      <div className="grid grid-cols-3 row-auto mb-4">
        {userHabits.map((habit: Habit) => {
          return (
            <HabitElement key={habit._id} habit={habit} changeDone={updateHabit}/>
          )
        })}
      </div>
      <HabitHistoryTable habits={userHabits}/>
    </div>
  );
}