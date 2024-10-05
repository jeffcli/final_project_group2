import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.png";

export default function NavBar() {
    return (
        <div className="static h-14 bg-slate-100 flex justify-between px-3">
            <div className="my-auto flex flex-row gap-2 h-full">
                <div className="h-full">
                    <img src={Logo} alt="Wellness Tracker Logo" className="h-full w-full object-contain" />
                </div>
                <h1 className="text-2xl font-bold my-auto">Wellness Tracker</h1>
            </div>
            <nav className="my-auto">
                <ul className="flex flex-row justify-end gap-1">
                    <li className="">
                            <Button variant="outline" asChild>
                                <a href="/"> 
                                    Home
                                </a>
                            </Button>
                    </li>
                    <li className="">
                            <Button variant="ghost" asChild>
                                <a href="/habits"> 
                                    Habits
                                </a>
                            </Button>
                    </li>
                    <li className="">
                            <Button variant="ghost" asChild>
                                <a href="/journal"> 
                                    Journal
                                </a>
                            </Button>
                    </li>
                    <li className="">
                            <Button variant="ghost" asChild>
                                <a href="/friends"> 
                                    Friends
                                </a>
                            </Button>
                    </li>
                    <li className="">
                            <Button variant="default" asChild>
                                <a href="/logout"> 
                                    Logout
                                </a>
                            </Button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}