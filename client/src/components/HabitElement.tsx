import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";

type Habit = {
    userName: string,
    description: string,
    created: string,
    completed: string[],
    _id: string
  }  

export default function HabitElement(props: { habit: Habit, key: string, changeDone: (habitId: string, status: boolean) => void }) {
    function checkCompeleted() {
        for (let i = 0; i < props.habit.completed.length; i++) {
            let mongoDBDate = new Date(props.habit.completed[i]).toDateString();
            let today = new Date().toDateString();
            if (mongoDBDate.slice(0, 10) === today.slice(0, 10)) {
                return true;
            }
        }
        return false;
    }
   
    const [habitChecked, setHabitChecked] = useState<boolean>(checkCompeleted());

    useEffect(() => {
        setHabitChecked(checkCompeleted());
    }, [props.habit])

    return (
        <div className="flex flex-row gap-2 justify-start mb-4">
            <div className="">
                <Checkbox className="mt-1.5" checked={habitChecked} onCheckedChange={(checkNow : boolean) => props.changeDone(props.habit._id, checkNow)}/>
            </div>
            <div>
                <div className="font-bold text-lg">{props.habit.description}</div>
                <div className="font-light text-sm">Last Completed: {props.habit.completed.length > 0 ? new Date(props.habit.completed[props.habit.completed.length - 1]).toDateString() : "Never"}</div>
        </div>
    </div>
    )
}