import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

type Habit = {
    userName: string,
    description: string,
    created: string,
    completed: string[],
    _id: string
  }  

export default function HabitHistoryTable(props: {habits: Habit[]}) {

    function checkCompeleted(habit: Habit, day: string) {
        for (let i = 0; i < habit.completed.length; i++) {
            let mongoDBDate = new Date(habit.completed[i]).toDateString();
            let today = new Date(day).toDateString();
            if (mongoDBDate.slice(0, 10) === today.slice(0, 10)) {
                return true;
            }
        }
        return false;
    }

    const days = [];
    const dayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let i = 1; i < 7; i++) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toDateString());
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    {props.habits.map((habit) => {
                        return <TableHead>{habit.description}</TableHead>
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {days.map((day) => {
                    return (
                        <TableRow>
                            <TableCell>
                                {dayLabels[new Date(day).getDay()] + " " + new Date(day).toLocaleDateString()}
                            </TableCell>
                            {props.habits.map((habit) => {
                                return (
                                    <TableCell>
                                        {checkCompeleted(habit, day) ? "✅" : "❌"}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}