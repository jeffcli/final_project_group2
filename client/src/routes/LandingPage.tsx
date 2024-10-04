import { Button, buttonVariants } from "@/components/ui/button";
import Image1 from "@/assets/Springcampus1.jpg";

export default function LandingPage() {
    return (
        <div className="flex flex-col w-[100vw] h-[100vh]">
            <div className="w-full h-[95%] absolute -z-10">
                <div className="w-full h-full bg-opacity-20 bg-gradient-to-t from-slate-950/80 to-slate-100/0" />
            </div>
            <div className="w-full h-[95%] absolute -z-20">
                <img src={Image1} alt="WPI fountain during Spring" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center h-[95%] justify-center gap-3">
                <h1 className="font-bold text-center my-2 text-5xl text-white">Welcome to Wellness Tracker</h1>
                <a href="/login" className={buttonVariants({variant: "secondary", size: "lg"})}>Go to Dashboard</a>
            </div>
            <div className="h-[5%] flex flex-col bg-gray-200">
                <p className="text-center text-gray-500 my-auto">Team 2 - Vivek Jagadeesh, Jeffrey Li, and Carter Moore</p>
            </div>
        </div>
    )
}