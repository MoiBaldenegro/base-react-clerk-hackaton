import { Button } from "@fluentui/react-components";
import { LandingCarousel } from "../components/ui/LandingCarousel";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    // Handle loading state
    return null;
  }

  if (!user) return null;
  return (
    <div className="landingContainer">
        <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      
      </header>
      <LandingCarousel  />
      <main>
      <Button appearance="primary" onClick={() => navigate("/home")}>Iniciar sesion</Button>
      <SignedIn>
        <UserButton appearance={{
          elements: {
            userButtonAvatarBox: { width: "80px", height: "80px"},
          },
        }}/>
      <p>Bienvenido {`${user.firstName}`}, puedes <a href="/home">Ir al panel de contenido</a></p>
      </SignedIn>
      </main>
    </div>
  );
}

export default Landing;