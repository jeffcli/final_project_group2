import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Slider } from "./ui/slider";
import { useAuth0 } from "@auth0/auth0-react";
import { MakeProtectedPostRequest } from "@/utils/makeProtectedPostRequest";
import { toast } from "sonner";

export default function MoodForm() {
    const [mood, setMood] = useState(5);
    const {user, getAccessTokenSilently} = useAuth0();

    const submitMood = async () => {
        try {
        const token = await getAccessTokenSilently(); 
    
        const toUpdate = {
            day: new Date().getDay(),
            mood: mood,
            userName: user!.name
        }; 
    
        const data = await MakeProtectedPostRequest('/api/updateMood',toUpdate, token); 
        } catch (e) {
        console.log("Error setting mood: ", e);
        toast.error("Error setting mood");
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="m-auto max-w-36" variant="default">Log Mood</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-3">
                    <div className="text-center">{mood < 4 ? "Poor" : mood < 8 ? "Neutral" : "Satisfactory"} - {mood}/10</div>
                    <Slider value={[mood]} max={10} step={1} onValueChange={(values) => {setMood(values[0])}}/>
                    <Button className="mx-auto" onClick={submitMood}>Submit</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}