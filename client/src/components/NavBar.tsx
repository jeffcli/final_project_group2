import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
    const { logout } = useAuth0();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: `${window.location.origin}/welcome`,
            }
        });
    }

    const handleHomeRedirect = () => {
        navigate('/');
    }

    return (
        <div className="static h-14 bg-slate-100 flex justify-between px-3">
            <div className="my-auto flex flex-row gap-2 h-full">
                <div className="h-full">
                    <img src={Logo} alt="Wellness Tracker Logo" onClick={handleHomeRedirect} className="h-full w-full object-contain cursor-pointer" />
                </div>
                <h1 className="text-2xl font-bold my-auto cursor-pointer" onClick={handleHomeRedirect}>Wellness Tracker</h1>
            </div>
            <nav className="my-auto">
                <ul className="flex flex-row justify-end gap-1">
                    <li className="">
                        <Button variant={location.pathname === '/' ? 'outline' : 'ghost'} asChild>
                            <a href="/">Home</a>
                        </Button>
                    </li>
                    <li className="">
                        <Button variant={location.pathname === '/habits' ? 'outline' : 'ghost'} asChild>
                            <a href="/habits">Habits</a>
                        </Button>
                    </li>
                    <li className="">
                        <Button variant={location.pathname === '/journal' ? 'outline' : 'ghost'} asChild>
                            <a href="/journal">Journal</a>
                        </Button>
                    </li>
                    <li className="">
                        <Button variant={location.pathname === '/friends' ? 'outline' : 'ghost'} asChild>
                            <a href="/friends">Friends</a>
                        </Button>
                    </li>
                    <li className="">
                        <Button onClick={handleLogout} className="hover:cursor-pointer" variant="default" asChild>
                            <p>Logout</p>
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}