import { CreateOrganization, SignedIn, SignedOut, SignIn, UserButton} from "@clerk/clerk-react";
import "./global.css";

export const Home = () => {
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
            <CreateOrganization />
            <p>To create an organization, please fill in the form.</p>
        </div>
    </SignedIn>  
    <SignedOut>
        <SignIn />
    </SignedOut>  
   </main>
  );
}
