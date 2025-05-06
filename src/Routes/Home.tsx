import {SignedIn, SignedOut, SignIn, UserButton} from "@clerk/clerk-react";
import "./global.css";
import { useNavigate } from "react-router-dom"
export const Home = () => {
  const navigate = useNavigate();
  return (
   <main className="homeContainer">
    <SignedIn >
        <UserButton showName appearance={{
            elements: {
                userButtonBox: { scale: 2, backgroundColor: "#1a1a1a", borderRadius: "8px" },
                userButtonAvatarBox: { width: "50px", height: "50px", backgroundColor: "#1a1a1a" },
                userButtonAvatarImage: { borderRadius: "50%" },
                userButtonDetails: { color: "#fff" },
                userButtonDetailsSubTitle: { color: "#fff" },
            },
        }}/>
        <div className="home">
            <h1>Welcome to the Home Page</h1>
            <p>This is a protected route. Only signed-in users can see this.</p>
            <p>To create an organization, please fill in the form.</p>
            <button onClick={()=> navigate("./create-navigate")}>Crear nueva organizacion</button>
        </div>
    </SignedIn>  
    <SignedOut>
        <SignIn />
    </SignedOut>  
   </main>
  );
}
